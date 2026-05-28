# CareerCrafter Backend API Documentation

## Overview
This document provides comprehensive documentation for all backend API endpoints organized by page functionality.

## Base URL
```
http://localhost:3000/api
```

## Authentication
Most endpoints require JWT authentication. Include the token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

---

## 1. Index Page (Main Landing Page) - `/api/index`

### Get Homepage Statistics
```http
GET /api/index/stats
```
Returns public statistics for the homepage display.

**Response:**
```json
{
  "totalUsers": 1250,
  "totalResumes": 3400,
  "activeUsers": 450,
  "successRate": 95,
  "aiSupport": "24/7"
}
```

### Get Featured Templates
```http
GET /api/index/featured-templates
```
Returns most popular templates based on usage.

**Response:**
```json
{
  "templates": [
    {
      "template": "modern",
      "usage_count": 150,
      "display_name": "Modern Professional",
      "description": "Perfect for tech and business professionals"
    }
  ]
}
```

### Get Testimonials
```http
GET /api/index/testimonials
```
Returns recent user testimonials (anonymized).

### Track Homepage Interactions
```http
POST /api/index/track-interaction
```
**Body:**
```json
{
  "action": "click",
  "element": "cta-button",
  "userId": "optional-user-id"
}
```

### Newsletter Signup
```http
POST /api/index/newsletter
```
**Body:**
```json
{
  "email": "user@example.com",
  "name": "John Doe"
}
```

---

## 2. Feature Details Page - `/api/features`

### Get All Features
```http
GET /api/features
```
Returns list of all features with statistics.

### Get Feature Details
```http
GET /api/features/:featureId
```
Returns detailed information about a specific feature.

**Available Feature IDs:**
- `ai-content`
- `smart-suggestions`
- `templates`
- `qr-generator`
- `ats-optimization`
- `export-formats`

### Rate a Feature (Auth Required)
```http
POST /api/features/:featureId/rate
```
**Body:**
```json
{
  "rating": 5,
  "comment": "Excellent feature!"
}
```

### Submit Feature Testimonial (Auth Required)
```http
POST /api/features/:featureId/testimonial
```
**Body:**
```json
{
  "testimonial": "This feature helped me land my dream job!",
  "rating": 5
}
```

### Compare Features
```http
GET /api/features/compare/:featureIds
```
Example: `/api/features/compare/ai-content,smart-suggestions,templates`

---

## 3. Template Details Page - `/api/templates`

### Get All Templates
```http
GET /api/templates?category=all&isPremium=false&sortBy=popularity
```
**Query Parameters:**
- `category`: Filter by category (Professional, Creative, etc.)
- `isPremium`: Filter by premium status (true/false)
- `sortBy`: Sort by popularity, rating, name, newest

### Get Template Details
```http
GET /api/templates/:templateId
```
**Available Template IDs:**
- `modern`
- `classic`
- `creative`
- `minimal`
- `executive`
- `tech`

### Rate a Template (Auth Required)
```http
POST /api/templates/:templateId/rate
```
**Body:**
```json
{
  "rating": 4,
  "comment": "Great design, very professional"
}
```

### Use Template (Auth Required)
```http
POST /api/templates/:templateId/use
```
Applies the template to user's active resume.

### Preview Template with User Data (Auth Required)
```http
POST /api/templates/:templateId/preview
```
Generates preview with user's resume data.

### Get Template Customization Options
```http
GET /api/templates/:templateId/customization
```
Returns available customization options for the template.

---

## 4. QR Demo Page - `/api/qr`

### Generate QR Code (Auth Required)
```http
POST /api/qr/generate
```
**Body:**
```json
{
  "resumeId": "resume-uuid",
  "customization": {
    "size": 256,
    "foregroundColor": "#000000",
    "backgroundColor": "#FFFFFF"
  }
}
```

### Get QR Code Details
```http
GET /api/qr/:qrId
```
Returns QR code information and statistics.

### Track QR Code Scan
```http
POST /api/qr/:qrId/scan
```
**Body:**
```json
{
  "userAgent": "Mozilla/5.0...",
  "ipAddress": "192.168.1.1",
  "referrer": "https://example.com"
}
```

### Get QR Code Analytics (Auth Required)
```http
GET /api/qr/:qrId/analytics
```
Returns detailed analytics for QR code performance.

### Get User's QR Codes (Auth Required)
```http
GET /api/qr/user/list?page=1&limit=10
```
Returns paginated list of user's QR codes.

### Update QR Code Status (Auth Required)
```http
PUT /api/qr/:qrId/status
```
**Body:**
```json
{
  "isActive": true
}
```

### Delete QR Code (Auth Required)
```http
DELETE /api/qr/:qrId
```

### Generate Demo QR Code (No Auth)
```http
POST /api/qr/demo
```
**Body:**
```json
{
  "customization": {
    "size": 256,
    "foregroundColor": "#000000",
    "backgroundColor": "#FFFFFF"
  }
}
```

### Get Customization Options
```http
GET /api/qr/customization/options
```
Returns available QR code customization options.

---

## 5. QR Integration Summary Page - `/api/qr-integration`

### Get QR Integration Summary (Auth Required)
```http
GET /api/qr-integration/summary
```
Returns comprehensive QR integration analytics for user.

### Get Best Practices
```http
GET /api/qr-integration/best-practices
```
Returns QR code best practices and tips.

### Get Case Studies
```http
GET /api/qr-integration/case-studies
```
Returns success stories and case studies.

### Get ROI Calculator Data
```http
GET /api/qr-integration/roi-calculator
```
Returns ROI calculation data and scenarios.

### Calculate Custom ROI
```http
POST /api/qr-integration/calculate-roi
```
**Body:**
```json
{
  "qrCodes": 5,
  "scansPerQR": 25,
  "conversionRate": 15,
  "valuePerConversion": 1000
}
```

### Get Integration Tutorials
```http
GET /api/qr-integration/tutorials
```
Returns step-by-step integration tutorials.

---

## 6. Test Features Page - `/api/test-features`

### Get Available Test Features
```http
GET /api/test-features/available
```
Returns all available features for testing.

### Start Feature Test Session
```http
POST /api/test-features/start/:featureId
```
**Body:**
```json
{
  "userId": "optional-user-id",
  "sessionData": {
    "testType": "interactive"
  }
}
```

### Update Test Progress
```http
PUT /api/test-features/session/:sessionId/progress
```
**Body:**
```json
{
  "step": 2,
  "data": {
    "completed": true
  },
  "status": "in_progress"
}
```

### Complete Test Session
```http
POST /api/test-features/session/:sessionId/complete
```
**Body:**
```json
{
  "results": {
    "success": true,
    "score": 85
  },
  "feedback": "Great feature!",
  "rating": 5
}
```

### Get Test Session Details
```http
GET /api/test-features/session/:sessionId
```

### Get Test Results and Analytics
```http
GET /api/test-features/results/:featureId?timeframe=30d
```
**Query Parameters:**
- `timeframe`: 7d, 30d, 90d, 1y

### Submit Bug Report
```http
POST /api/test-features/bug-report
```
**Body:**
```json
{
  "featureId": "ai-content-generation",
  "sessionId": "session-uuid",
  "description": "Feature crashed when...",
  "severity": "high",
  "steps": "1. Click button 2. Enter text 3. Crash",
  "userAgent": "Mozilla/5.0...",
  "userId": "optional-user-id"
}
```

### Get User Test History (Auth Required)
```http
GET /api/test-features/user/history?page=1&limit=10
```

---

## Error Responses

All endpoints return consistent error responses:

```json
{
  "error": "Error message description"
}
```

**Common HTTP Status Codes:**
- `200`: Success
- `201`: Created
- `400`: Bad Request
- `401`: Unauthorized
- `403`: Forbidden
- `404`: Not Found
- `409`: Conflict
- `500`: Internal Server Error

---

## Rate Limiting

API endpoints are rate-limited to 100 requests per 15 minutes per IP address.

---

## Database Schema

### New Tables Added:

1. **page_interactions** - Track user interactions for analytics
2. **newsletter_subscribers** - Store newsletter subscriptions
3. **feature_ratings** - Store feature ratings and reviews
4. **feature_testimonials** - Store feature testimonials
5. **template_ratings** - Store template ratings and reviews
6. **template_testimonials** - Store template testimonials
7. **qr_codes** - Store QR code information
8. **qr_scans** - Track QR code scans
9. **feature_tests** - Store feature test sessions
10. **feature_test_ratings** - Store test session ratings
11. **bug_reports** - Store bug reports from testing
12. **work_experience** - Renamed from experience for clarity

---

## Usage Examples

### Frontend Integration Example (JavaScript):

```javascript
// Get homepage stats
async function getHomepageStats() {
  try {
    const response = await fetch('/api/index/stats');
    const data = await response.json();
    console.log('Homepage stats:', data);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Generate QR code (with auth)
async function generateQRCode(resumeId, token) {
  try {
    const response = await fetch('/api/qr/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        resumeId: resumeId,
        customization: {
          size: 256,
          foregroundColor: '#000000',
          backgroundColor: '#FFFFFF'
        }
      })
    });
    const data = await response.json();
    console.log('QR Code generated:', data);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Track page interaction
async function trackInteraction(action, element) {
  try {
    await fetch('/api/index/track-interaction', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        action: action,
        element: element
      })
    });
  } catch (error) {
    console.error('Error tracking interaction:', error);
  }
}
```

This comprehensive backend system provides:

1. **Modular Architecture** - Each page has its own dedicated backend module
2. **Database Operations** - Full CRUD operations for page-specific data
3. **User Authentication** - Session management and user-specific data
4. **Analytics & Tracking** - Comprehensive interaction and usage tracking
5. **QR Code Functionality** - Complete QR code generation and analytics
6. **Feature Testing** - Robust testing framework for new features
7. **Rating & Review System** - User feedback collection for features and templates
8. **Performance Optimization** - Proper indexing and efficient queries

Each backend module is designed to be scalable and maintainable, with proper error handling and security measures in place.