# Custom Tour Request API Documentation

This document describes the APIs for the custom tour request system where tourists can request custom tours, guides can view and accept requests, and admins can oversee the process.

## Base URL

```
http://localhost:5000/api/custom-tour-requests
```

## Authentication

All endpoints require authentication. Include the JWT token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## API Endpoints

### Tourist Endpoints

#### 1. Create Custom Tour Request

**POST** `/api/custom-tour-requests`

Creates a new custom tour request that will be visible to all guides and admins.

**Request Body:**

```json
{
  "title": "Custom City Tour",
  "description": "I want to explore the historical sites of the city",
  "preferredDate": "2024-02-15T10:00:00.000Z",
  "duration": 4,
  "maxTourists": 6,
  "budget": 200,
  "location": "Downtown City Center",
  "specialRequirements": "Wheelchair accessible tour"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Custom tour request created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "tourist": "507f1f77bcf86cd799439012",
    "title": "Custom City Tour",
    "description": "I want to explore the historical sites of the city",
    "preferredDate": "2024-02-15T10:00:00.000Z",
    "duration": 4,
    "maxTourists": 6,
    "budget": 200,
    "location": "Downtown City Center",
    "specialRequirements": "Wheelchair accessible tour",
    "status": "pending",
    "createdAt": "2024-01-15T10:00:00.000Z",
    "updatedAt": "2024-01-15T10:00:00.000Z"
  }
}
```

#### 2. Get My Custom Tour Requests

**GET** `/api/custom-tour-requests/my-requests`

Retrieves all custom tour requests created by the authenticated tourist.

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "title": "Custom City Tour",
      "description": "I want to explore the historical sites of the city",
      "preferredDate": "2024-02-15T10:00:00.000Z",
      "duration": 4,
      "maxTourists": 6,
      "budget": 200,
      "location": "Downtown City Center",
      "specialRequirements": "Wheelchair accessible tour",
      "status": "accepted",
      "acceptedBy": {
        "_id": "507f1f77bcf86cd799439013",
        "name": "John Guide",
        "email": "john@example.com"
      },
      "price": 180,
      "tourId": {
        "_id": "507f1f77bcf86cd799439014",
        "title": "Custom City Tour",
        "price": 180,
        "startDate": "2024-02-15T10:00:00.000Z",
        "endDate": "2024-02-15T14:00:00.000Z"
      },
      "createdAt": "2024-01-15T10:00:00.000Z"
    }
  ]
}
```

#### 3. Get My Custom Tour Request by ID

**GET** `/api/custom-tour-requests/my-requests/:id`

Retrieves a specific custom tour request by ID.

**Response:**

```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "tourist": {
      "_id": "507f1f77bcf86cd799439012",
      "name": "Jane Tourist",
      "email": "jane@example.com"
    },
    "title": "Custom City Tour",
    "description": "I want to explore the historical sites of the city",
    "preferredDate": "2024-02-15T10:00:00.000Z",
    "duration": 4,
    "maxTourists": 6,
    "budget": 200,
    "location": "Downtown City Center",
    "specialRequirements": "Wheelchair accessible tour",
    "status": "accepted",
    "acceptedBy": {
      "_id": "507f1f77bcf86cd799439013",
      "name": "John Guide",
      "email": "john@example.com"
    },
    "acceptedAt": "2024-01-16T10:00:00.000Z",
    "price": 180,
    "tourId": {
      "_id": "507f1f77bcf86cd799439014",
      "title": "Custom City Tour",
      "price": 180,
      "startDate": "2024-02-15T10:00:00.000Z",
      "endDate": "2024-02-15T14:00:00.000Z",
      "zoomJoinLink": "https://zoom.us/j/123456789",
      "zoomHostLink": "https://zoom.us/s/123456789"
    },
    "createdAt": "2024-01-15T10:00:00.000Z"
  }
}
```

#### 4. Update Custom Tour Request

**PUT** `/api/custom-tour-requests/my-requests/:id`

Updates a custom tour request (only if status is "pending").

**Request Body:**

```json
{
  "title": "Updated Custom City Tour",
  "description": "Updated description",
  "budget": 250,
  "specialRequirements": "Updated requirements"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Custom tour request updated successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "title": "Updated Custom City Tour",
    "description": "Updated description",
    "budget": 250,
    "specialRequirements": "Updated requirements",
    "status": "pending"
  }
}
```

#### 5. Delete Custom Tour Request

**DELETE** `/api/custom-tour-requests/my-requests/:id`

Deletes a custom tour request (only if status is "pending").

**Response:**

```json
{
  "success": true,
  "message": "Custom tour request deleted successfully"
}
```

### Guide Endpoints

#### 1. Get All Custom Tour Requests

**GET** `/api/custom-tour-requests`

Retrieves all custom tour requests with pagination and filtering.

**Query Parameters:**

- `status` (optional): Filter by status ("pending", "accepted", "rejected", "completed")
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "tourist": {
        "_id": "507f1f77bcf86cd799439012",
        "name": "Jane Tourist",
        "email": "jane@example.com"
      },
      "title": "Custom City Tour",
      "description": "I want to explore the historical sites of the city",
      "preferredDate": "2024-02-15T10:00:00.000Z",
      "duration": 4,
      "maxTourists": 6,
      "budget": 200,
      "location": "Downtown City Center",
      "specialRequirements": "Wheelchair accessible tour",
      "status": "pending",
      "createdAt": "2024-01-15T10:00:00.000Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalItems": 50
  }
}
```

#### 2. Get Custom Tour Request by ID

**GET** `/api/custom-tour-requests/:id`

Retrieves a specific custom tour request by ID.

#### 3. Accept Custom Tour Request

**POST** `/api/custom-tour-requests/:id/accept`

Accepts a custom tour request and creates a new tour entry.

**Request Body:**

```json
{
  "price": 180,
  "startDate": "2024-02-15T10:00:00.000Z",
  "endDate": "2024-02-15T14:00:00.000Z",
  "zoomJoinLink": "https://zoom.us/j/123456789",
  "zoomHostLink": "https://zoom.us/s/123456789"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Custom tour request accepted successfully",
  "data": {
    "customTourRequest": {
      "_id": "507f1f77bcf86cd799439011",
      "status": "accepted",
      "acceptedBy": "507f1f77bcf86cd799439013",
      "acceptedAt": "2024-01-16T10:00:00.000Z",
      "price": 180,
      "tourId": "507f1f77bcf86cd799439014"
    },
    "tour": {
      "_id": "507f1f77bcf86cd799439014",
      "title": "Custom City Tour",
      "description": "I want to explore the historical sites of the city",
      "price": 180,
      "startDate": "2024-02-15T10:00:00.000Z",
      "endDate": "2024-02-15T14:00:00.000Z",
      "maxTourists": 6,
      "guide": "507f1f77bcf86cd799439013",
      "zoomJoinLink": "https://zoom.us/j/123456789",
      "zoomHostLink": "https://zoom.us/s/123456789"
    }
  }
}
```

### Admin Endpoints

#### 1. Get All Custom Tour Requests (Admin)

**GET** `/api/custom-tour-requests/admin/all`

Retrieves all custom tour requests for admin oversight.

#### 2. Get Custom Tour Request by ID (Admin)

**GET** `/api/custom-tour-requests/admin/:id`

Retrieves a specific custom tour request by ID for admin oversight.

## Status Values

- `pending`: Request is waiting for a guide to accept
- `accepted`: Request has been accepted by a guide and tour is created
- `rejected`: Request has been rejected (future feature)
- `completed`: Tour has been completed (future feature)

## Error Responses

### 401 Unauthorized

```json
{
  "message": "Not authorized, no token"
}
```

### 403 Forbidden

```json
{
  "message": "Forbidden: insufficient role"
}
```

### 404 Not Found

```json
{
  "success": false,
  "message": "Custom tour request not found"
}
```

### 400 Bad Request

```json
{
  "success": false,
  "message": "This request has already been processed"
}
```

### 500 Internal Server Error

```json
{
  "success": false,
  "message": "Error creating custom tour request",
  "error": "Error details"
}
```

## Usage Examples

### Tourist Creating a Request

```javascript
const response = await fetch("/api/custom-tour-requests", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  },
  body: JSON.stringify({
    title: "Custom City Tour",
    description: "I want to explore the historical sites of the city",
    preferredDate: "2024-02-15T10:00:00.000Z",
    duration: 4,
    maxTourists: 6,
    budget: 200,
    location: "Downtown City Center",
    specialRequirements: "Wheelchair accessible tour",
  }),
});
```

### Guide Accepting a Request

```javascript
const response = await fetch(
  "/api/custom-tour-requests/507f1f77bcf86cd799439011/accept",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({
      price: 180,
      startDate: "2024-02-15T10:00:00.000Z",
      endDate: "2024-02-15T14:00:00.000Z",
      zoomJoinLink: "https://zoom.us/j/123456789",
      zoomHostLink: "https://zoom.us/s/123456789",
    }),
  }
);
```

## Notes

1. Only approved guides can accept tour requests
2. Tourists can only update/delete their own requests when status is "pending"
3. When a guide accepts a request, a new tour entry is automatically created
4. The accepted tour becomes the property of the accepting guide
5. All timestamps are in ISO 8601 format
6. Duration is specified in hours
7. Budget and price are in the same currency unit
