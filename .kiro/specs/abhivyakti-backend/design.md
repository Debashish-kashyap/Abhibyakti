# Abhivyakti Backend System Design Document

## Overview

This design document outlines the implementation of a comprehensive backend system for the Abhivyakti community cultural platform. The system follows a microservices-inspired architecture using Supabase as the primary backend-as-a-service platform, with additional services for media storage, content moderation, and real-time features.

The backend prioritizes child safety, content moderation, and scalable performance while maintaining simplicity for rapid development and deployment. The system uses PostgreSQL for relational data, Supabase Storage for media files, and implements row-level security (RLS) for data protection.

## Architecture

### Technology Stack

**Primary Backend**: Supabase (PostgreSQL + Auth + Storage + Real-time)
**Media Storage**: Supabase Storage with Cloudinary integration for processing
**Authentication**: Supabase Auth with custom policies
**API Layer**: Supabase Edge Functions (Deno/TypeScript)
**Real-time**: Supabase Realtime subscriptions
**Email**: Supabase integrated email service
**Monitoring**: Supabase Analytics + custom logging

### System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend (Next.js)                       │
└─────────────────────┬───────────────────────────────────────┘
                      │ HTTP/WebSocket
┌─────────────────────▼───────────────────────────────────────┐
│                 Supabase Platform                           │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────────────────┐ │
│  │   Auth      │ │ PostgreSQL  │ │    Edge Functions       │ │
│  │   Service   │ │  Database   │ │   (API Endpoints)       │ │
│  └─────────────┘ └─────────────┘ └─────────────────────────┘ │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────────────────┐ │
│  │   Storage   │ │  Real-time  │ │     Row Level           │ │
│  │   Service   │ │  Subscript. │ │     Security            │ │
│  └─────────────┘ └─────────────┘ └─────────────────────────┘ │
└─────────────────────┬───────────────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────────────┐
│              External Services                              │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────────────────┐ │
│  │ Cloudinary  │ │   Email     │ │    Content Scanning     │ │
│  │ (Media Proc)│ │  Service    │ │      (Optional)         │ │
│  └─────────────┘ └─────────────┘ └─────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## Components and Interfaces

### Database Schema

#### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  display_name TEXT NOT NULL,
  age_group TEXT CHECK (age_group IN ('child', 'adult')) NOT NULL,
  parent_email TEXT, -- Required for child accounts
  parent_consent_verified BOOLEAN DEFAULT FALSE,
  profile_image_url TEXT,
  bio TEXT,
  privacy_settings JSONB DEFAULT '{}',
  notification_preferences JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_active BOOLEAN DEFAULT TRUE
);
```

#### Performances Table
```sql
CREATE TABLE performances (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT CHECK (category IN ('music', 'poetry', 'storytelling', 'acting')) NOT NULL,
  file_url TEXT, -- Supabase Storage URL
  cloud_link TEXT, -- External cloud storage link
  file_type TEXT, -- 'upload' or 'link'
  file_size BIGINT,
  duration_seconds INTEGER,
  thumbnail_url TEXT,
  visibility TEXT CHECK (visibility IN ('group', 'public')) DEFAULT 'group',
  moderation_status TEXT CHECK (moderation_status IN ('pending', 'approved', 'rejected', 'flagged')) DEFAULT 'pending',
  moderation_notes TEXT,
  moderated_by UUID REFERENCES users(id),
  moderated_at TIMESTAMP WITH TIME ZONE,
  view_count INTEGER DEFAULT 0,
  like_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### Interactions Table
```sql
CREATE TABLE interactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  performance_id UUID REFERENCES performances(id) ON DELETE CASCADE,
  interaction_type TEXT CHECK (interaction_type IN ('like', 'view', 'comment')) NOT NULL,
  comment_text TEXT, -- Only for comment interactions
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, performance_id, interaction_type) -- Prevent duplicate likes
);
```

#### Moderation_Log Table
```sql
CREATE TABLE moderation_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  performance_id UUID REFERENCES performances(id) ON DELETE CASCADE,
  moderator_id UUID REFERENCES users(id),
  action TEXT CHECK (action IN ('approve', 'reject', 'flag', 'unflag')) NOT NULL,
  reason TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### API Endpoints Structure

#### Authentication Endpoints
```typescript
// Handled by Supabase Auth
POST /auth/signup
POST /auth/signin
POST /auth/signout
POST /auth/verify-email
POST /auth/reset-password
```

#### User Management Endpoints
```typescript
GET    /api/users/profile
PUT    /api/users/profile
POST   /api/users/verify-parental-consent
GET    /api/users/child-accounts (for parents)
PUT    /api/users/privacy-settings
```

#### Performance Management Endpoints
```typescript
POST   /api/performances/submit
GET    /api/performances/my-submissions
GET    /api/performances/feed
GET    /api/performances/:id
PUT    /api/performances/:id/visibility
DELETE /api/performances/:id
```

#### Moderation Endpoints
```typescript
GET    /api/moderation/queue
POST   /api/moderation/:id/approve
POST   /api/moderation/:id/reject
POST   /api/moderation/:id/flag
GET    /api/moderation/logs
```

#### Interaction Endpoints
```typescript
POST   /api/interactions/like
DELETE /api/interactions/like
POST   /api/interactions/comment
GET    /api/interactions/comments/:performance_id
POST   /api/interactions/view
```

## Data Models

### TypeScript Interfaces

```typescript
interface User {
  id: string
  email: string
  display_name: string
  age_group: 'child' | 'adult'
  parent_email?: string
  parent_consent_verified: boolean
  profile_image_url?: string
  bio?: string
  privacy_settings: PrivacySettings
  notification_preferences: NotificationPreferences
  created_at: string
  updated_at: string
  is_active: boolean
}

interface Performance {
  id: string
  user_id: string
  title: string
  description?: string
  category: 'music' | 'poetry' | 'storytelling' | 'acting'
  file_url?: string
  cloud_link?: string
  file_type: 'upload' | 'link'
  file_size?: number
  duration_seconds?: number
  thumbnail_url?: string
  visibility: 'group' | 'public'
  moderation_status: 'pending' | 'approved' | 'rejected' | 'flagged'
  moderation_notes?: string
  moderated_by?: string
  moderated_at?: string
  view_count: number
  like_count: number
  created_at: string
  updated_at: string
  user?: User // Populated in queries
}

interface Interaction {
  id: string
  user_id: string
  performance_id: string
  interaction_type: 'like' | 'view' | 'comment'
  comment_text?: string
  created_at: string
  user?: User // Populated in queries
}

interface PrivacySettings {
  profile_visibility: 'public' | 'group' | 'private'
  allow_comments: boolean
  allow_direct_messages: boolean
  show_in_search: boolean
}

interface NotificationPreferences {
  email_notifications: boolean
  submission_updates: boolean
  interaction_notifications: boolean
  community_updates: boolean
}
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

Now I need to analyze the acceptance criteria for testability using the prework tool:
### Property 1: User Registration Email Verification
*For any* user registration request, the system should send an email verification and prevent access to protected resources until verification is completed
**Validates: Requirements 1.1**

### Property 2: Authentication Session Management
*For any* authentication attempt, valid credentials should create secure sessions and invalid credentials should be rejected
**Validates: Requirements 1.2**

### Property 3: Age-Based Account Restrictions
*For any* child account, the system should enforce restrictions that are not applied to adult accounts
**Validates: Requirements 1.3**

### Property 4: Parental Consent Requirement
*For any* user account with age_group 'child', the account should remain inactive until parental consent is verified
**Validates: Requirements 1.4**

### Property 5: Profile Update Persistence
*For any* valid profile update request, the changes should persist in the database and be reflected in subsequent queries
**Validates: Requirements 1.5**

### Property 6: Audio File Upload Validation
*For any* audio file upload, files in valid formats (MP3, WAV, M4A) under 50MB should be accepted and invalid files should be rejected
**Validates: Requirements 2.1**

### Property 7: Video File Upload Validation
*For any* video file upload, files in valid formats (MP4, MOV, AVI) under 200MB should be accepted and invalid files should be rejected
**Validates: Requirements 2.2**

### Property 8: Cloud Storage Link Validation
*For any* cloud storage link submission, valid links from supported providers should be accepted and invalid links should be rejected
**Validates: Requirements 2.3**

### Property 9: File Security Scanning
*For any* file upload, malicious content should be detected and rejected while safe files should be accepted
**Validates: Requirements 2.4**

### Property 10: Unique Identifier Generation
*For any* submission, the system should generate unique identifiers and no two submissions should have the same ID
**Validates: Requirements 2.5**

### Property 11: Submission Moderation Queue
*For any* new performance submission, it should be created with 'pending' moderation status and not be publicly visible
**Validates: Requirements 3.1**

### Property 12: Moderation Action Effects
*For any* moderation action (approve/reject/flag), the submission status should be updated appropriately and changes should persist
**Validates: Requirements 3.2**

### Property 13: Moderation Notification Delivery
*For any* moderation decision, appropriate notifications should be sent to the submitter via configured channels
**Validates: Requirements 3.3**

### Property 14: Moderation Audit Logging
*For any* moderation action, a corresponding audit log entry should be created with complete action details
**Validates: Requirements 3.4**

### Property 15: Content Flagging Mechanism
*For any* content flagging action, the content status should be updated and appropriate reports should be generated
**Validates: Requirements 3.5**

### Property 16: Search Filter Accuracy
*For any* search query with filters, only results matching all specified criteria should be returned
**Validates: Requirements 4.1**

### Property 17: Like Interaction Recording
*For any* like action on an approved performance, the interaction should be recorded and like count should be incremented
**Validates: Requirements 4.2**

### Property 18: Age-Appropriate Comment Moderation
*For any* comment submission, inappropriate content should be filtered or flagged based on age-appropriate guidelines
**Validates: Requirements 4.3**

### Property 19: View Count Accuracy
*For any* performance view, the view count should be incremented exactly once per user session
**Validates: Requirements 4.4**

### Property 20: Recommendation Relevance
*For any* recommendation request, suggested performances should match user preferences and interaction history
**Validates: Requirements 4.5**

### Property 21: Parental Dashboard Access
*For any* parent account, they should be able to access activity data for all linked child accounts
**Validates: Requirements 5.1**

### Property 22: Parental Approval Workflow
*For any* child account action requiring approval, the action should remain pending until parental consent is granted
**Validates: Requirements 5.2**

### Property 23: Parental Notification Delivery
*For any* child account interaction, appropriate notifications should be sent to the linked parent account
**Validates: Requirements 5.3**

### Property 24: Parental Control Enforcement
*For any* privacy or interaction restriction set by a parent, it should be enforced for the child account
**Validates: Requirements 5.4**

### Property 25: Reporting Mechanism Functionality
*For any* report submission about concerning content or interactions, a report record should be created and processed
**Validates: Requirements 5.5**

### Property 26: Analytics Data Accuracy
*For any* analytics query, the returned data should accurately reflect current system state and user interactions
**Validates: Requirements 6.3**

### Property 27: Data Retention Policy Compliance
*For any* data subject to retention policies, it should be automatically deleted when the retention period expires
**Validates: Requirements 6.4**

### Property 28: Privacy Request Processing
*For any* data export or deletion request, the system should process it completely and provide confirmation
**Validates: Requirements 6.5**

### Property 29: API Response Format Consistency
*For any* API endpoint response, it should follow the standardized response format structure
**Validates: Requirements 7.1**

### Property 30: Input Validation Completeness
*For any* API request with invalid input, appropriate validation errors should be returned with descriptive messages
**Validates: Requirements 7.2**

### Property 31: API Rate Limiting Enforcement
*For any* API client exceeding rate limits, subsequent requests should be rejected until the limit resets
**Validates: Requirements 7.3**

### Property 32: Health Check Accuracy
*For any* health check request, the response should accurately reflect the current system status and dependencies
**Validates: Requirements 7.5**

### Property 33: Email Notification Delivery
*For any* submission status change, appropriate email notifications should be sent to the submitter
**Validates: Requirements 8.1**

### Property 34: In-App Notification Generation
*For any* user interaction (like, comment), appropriate in-app notifications should be generated for the content owner
**Validates: Requirements 8.2**

### Property 35: Push Notification Delivery
*For any* significant event, appropriate push notifications should be sent to users with mobile apps installed
**Validates: Requirements 8.3**

### Property 36: Notification Preference Enforcement
*For any* notification event, delivery should respect the user's configured notification preferences
**Validates: Requirements 8.4**

### Property 37: Notification Delivery Reliability
*For any* failed notification delivery, the system should implement retry mechanisms and track delivery status
**Validates: Requirements 8.5**

## Error Handling

### Database Error Handling
- **Connection Failures**: Implement connection pooling and retry logic with exponential backoff
- **Constraint Violations**: Return user-friendly error messages for unique constraint and foreign key violations
- **Transaction Rollbacks**: Ensure data consistency by properly handling transaction failures
- **Query Timeouts**: Implement query timeouts and provide fallback responses

### File Upload Error Handling
- **File Size Limits**: Reject files exceeding size limits with clear error messages
- **Invalid Formats**: Validate file types and return specific format requirements
- **Storage Failures**: Implement retry logic for storage operations and cleanup on failures
- **Malware Detection**: Quarantine suspicious files and notify administrators

### Authentication Error Handling
- **Invalid Credentials**: Return generic error messages to prevent user enumeration
- **Session Expiry**: Implement automatic token refresh and graceful session handling
- **Rate Limiting**: Implement progressive delays for repeated failed authentication attempts
- **Account Lockouts**: Temporary account suspension after multiple failed attempts

### API Error Handling
- **Input Validation**: Return structured validation errors with field-specific messages
- **Authorization Failures**: Return appropriate HTTP status codes with minimal information
- **Rate Limiting**: Provide clear rate limit information in response headers
- **Service Unavailability**: Return maintenance mode responses with retry information

## Testing Strategy

### Unit Testing Approach

**Database Operations**:
- Test CRUD operations for all entities
- Verify constraint enforcement and data validation
- Test transaction rollback scenarios
- Validate row-level security policies

**Authentication & Authorization**:
- Test user registration and email verification flows
- Verify password hashing and session management
- Test role-based access control
- Validate parental consent workflows

**File Upload & Storage**:
- Test file validation and size limits
- Verify storage operations and URL generation
- Test malware scanning integration
- Validate metadata extraction

### Property-Based Testing Approach

**Data Integrity Properties**:
- Generate random user data and verify database constraints
- Test file upload validation with various file types and sizes
- Validate search and filtering with random query parameters
- Test notification delivery with various user preference combinations

**Security Properties**:
- Test authentication with various credential combinations
- Verify authorization with different user roles and permissions
- Test rate limiting with various request patterns
- Validate data access controls with different user contexts

**Business Logic Properties**:
- Test moderation workflows with various content types
- Verify parental control enforcement with different restriction combinations
- Test recommendation algorithms with various user interaction patterns
- Validate analytics calculations with different data scenarios

### Integration Testing

**API Endpoint Testing**:
- Test complete request/response cycles for all endpoints
- Verify error handling and status code accuracy
- Test authentication middleware integration
- Validate rate limiting and CORS policies

**External Service Integration**:
- Test email delivery service integration
- Verify file storage service operations
- Test push notification service integration
- Validate content scanning service integration

**Real-time Feature Testing**:
- Test WebSocket connection management
- Verify real-time notification delivery
- Test subscription and unsubscription flows
- Validate real-time data synchronization

### Performance Testing

**Load Testing**:
- Test API endpoints under various load conditions
- Verify database performance with large datasets
- Test file upload performance with concurrent users
- Validate real-time feature scalability

**Stress Testing**:
- Test system behavior at maximum capacity
- Verify graceful degradation under extreme load
- Test recovery after system overload
- Validate error handling under stress conditions