# Database Schema and Row Level Security Implementation

## Overview

This document describes the implementation of the database schema and Row Level Security (RLS) policies for the Abhivyakti backend system. The implementation focuses on child safety, content moderation, and secure data access.

## Database Tables

### 1. Users Table
- **Purpose**: Store user account information with age-based restrictions
- **Key Features**:
  - Age-based account types (child/adult)
  - Parental consent verification for child accounts
  - Privacy and notification preferences
  - Audit trail with created_at/updated_at timestamps

### 2. Performances Table
- **Purpose**: Store user-submitted audio/video performances
- **Key Features**:
  - Support for both file uploads and cloud storage links
  - Moderation status tracking (pending/approved/rejected/flagged)
  - View and like count tracking
  - Category-based organization

### 3. Interactions Table
- **Purpose**: Track user interactions with performances
- **Key Features**:
  - Support for likes, views, and comments
  - Unique constraint to prevent duplicate likes
  - Comment text storage for comment interactions

### 4. Moderation Log Table
- **Purpose**: Audit trail for all moderation actions
- **Key Features**:
  - Complete history of moderation decisions
  - Moderator identification and reasoning
  - Timestamped entries for compliance

## Enhanced Row Level Security (RLS) Policies

### Child Safety Policies
1. **Parental Consent Enforcement**: Child accounts require verified parental consent
2. **Parent Access**: Parents can view their child's profile and performances
3. **Restricted Operations**: Child accounts have limited capabilities until consent is verified

### Data Protection Policies
1. **User Data Access**: Users can only view and modify their own data
2. **Performance Visibility**: Only approved performances are publicly visible
3. **Interaction Controls**: Users can only interact with approved content
4. **Moderation Access**: Only adult users can access moderation logs

### Content Moderation Policies
1. **Automatic Pending Status**: All new performances start as pending moderation
2. **Moderation Logging**: All moderation actions are automatically logged
3. **Status-Based Access**: Content visibility depends on moderation status

## Database Constraints

### Data Integrity Constraints
1. **Child Account Validation**: Child accounts must have parent email and consent
2. **File Type Consistency**: Upload/link types must have corresponding URLs
3. **Comment Text Requirement**: Comment interactions must include text
4. **Category Validation**: Performances must use valid categories

### Referential Integrity
1. **Foreign Key Constraints**: All relationships properly enforced
2. **Cascade Deletions**: User deletion removes associated data
3. **Unique Constraints**: Email uniqueness and interaction uniqueness

## Triggers and Functions

### Automated Data Management
1. **Child Account Validation**: Trigger validates child account requirements
2. **Performance Status**: Automatically sets moderation status for new submissions
3. **Count Updates**: Automatically maintains like and view counts
4. **Moderation Logging**: Automatically logs moderation status changes

### Data Consistency
1. **Updated At Triggers**: Automatically update timestamps on record changes
2. **Count Synchronization**: Keep performance counts in sync with interactions
3. **Audit Trail**: Maintain complete history of moderation actions

## Security Features

### Authentication Integration
- RLS policies integrate with Supabase Auth
- User identification through auth.uid()
- Session-based access control

### Child Protection
- Mandatory parental consent for child accounts
- Restricted access until consent verification
- Parental oversight capabilities

### Content Safety
- All content requires moderation approval
- Comprehensive audit logging
- Automated status management

## Testing

### Validation Testing
- Email format validation
- Child account data validation
- Performance data validation
- Interaction data validation

### Schema Testing
- Required table structure verification
- Field requirement validation
- Constraint enforcement testing

### Security Testing
- RLS policy concept validation
- Child safety rule verification
- Data protection policy testing

## Migration Files

1. **001_initial_schema.sql**: Base table structure and basic RLS policies
2. **002_enhanced_rls_policies.sql**: Enhanced security policies and constraints

## Utility Functions

### Data Validation
- `validateChildAccountData()`: Validates child account requirements
- `validatePerformanceData()`: Validates performance submission data
- `validateInteractionData()`: Validates user interaction data

### Security Helpers
- `checkUserPermissions()`: Verifies user access rights
- `checkModerationStatus()`: Checks content moderation status
- `sanitizeInput()`: Sanitizes user input data

## Compliance Features

### Child Safety Compliance
- COPPA-compliant parental consent workflow
- Age-appropriate content restrictions
- Comprehensive audit logging

### Data Protection
- User data access controls
- Privacy setting enforcement
- Data retention policy support

## Next Steps

1. **Role-Based Access Control**: Implement moderator roles
2. **Advanced Permissions**: Add granular permission system
3. **Data Retention**: Implement automated data cleanup
4. **Performance Optimization**: Add database indexing optimization
5. **Monitoring**: Add database performance monitoring

## Requirements Satisfied

This implementation satisfies the following requirements:
- **1.3**: Age-based account types with appropriate restrictions
- **1.4**: Parental consent verification for child accounts
- **3.4**: Comprehensive audit logging for moderation actions
- **6.1**: Data encryption and security measures through RLS policies

The database schema provides a secure, scalable foundation for the Abhivyakti platform with strong child safety protections and comprehensive content moderation capabilities.