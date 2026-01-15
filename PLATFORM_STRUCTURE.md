# Multi-Agent Workflow Platform - Frontend Structure

## Platform Overview

A comprehensive SaaS platform for creating, managing, and executing AI-powered workflows with a focus on the Algerian market.

---

## Core User Types

1. **Free User** - 50 workflows/month, 100 API calls/day
2. **Starter User** - 500 workflows/month, 1,000 API calls/day (3,000 DZD/month)
3. **Pro User** - 5,000 workflows/month, 10,000 API calls/day (9,000 DZD/month)
4. **Enterprise User** - Unlimited workflows and API calls (Custom pricing)
5. **Admin** - Platform management, analytics, user management

---

## Page Structure & Routes

### Public Pages (No Authentication Required)

#### 1. Landing Page (`/`)
- Hero section with platform overview
- Key features showcase
- Pricing tiers preview
- Customer testimonials
- Call-to-action buttons (Sign Up, Learn More)
- Navigation to other public pages

#### 2. Pricing Page (`/pricing`)
- Detailed pricing tiers
- Feature comparison table
- FAQ section
- Upgrade/downgrade information
- Contact sales button

#### 3. Documentation/Help (`/docs`)
- Getting started guide
- API documentation
- Workflow templates guide
- FAQ
- Video tutorials
- Contact support

#### 4. About Page (`/about`)
- Company mission
- Team information
- Platform statistics
- Contact information

---

### Authentication Pages

#### 5. Sign Up (`/auth/signup`)
- Email/password registration
- Email verification
- Terms acceptance
- Redirect to onboarding

#### 6. Login (`/auth/login`)
- Email/password login
- "Remember me" option
- "Forgot password" link
- Social login options (optional)

#### 7. Forgot Password (`/auth/forgot-password`)
- Email input
- Password reset email sent confirmation
- Reset link handler

#### 8. Reset Password (`/auth/reset-password/:token`)
- New password input
- Password confirmation
- Success redirect to login

---

### Authenticated User Pages

#### 9. Dashboard (`/dashboard`)
- Welcome message with user name
- Quick stats (workflows run, API usage, remaining quota)
- Recent workflows list
- Quick actions (Create workflow, Browse templates)
- Usage analytics chart
- Upcoming features

#### 10. Workflows (`/workflows`)
- List of user's workflows
- Search and filter
- Create new workflow button
- Workflow status indicators
- Quick actions (edit, run, delete, duplicate)
- Pagination

#### 11. Workflow Detail (`/workflows/:id`)
- Workflow name and description
- Configuration details
- Execution history
- Run workflow button
- Edit workflow button
- Delete workflow button
- Share workflow option

#### 12. Workflow Builder (`/workflows/builder` or `/workflows/:id/edit`)
- Visual workflow editor
- Drag-and-drop interface
- Node types (input, AI agent, output, condition, loop)
- Configuration panel for each node
- Preview/test functionality
- Save and publish buttons
- Cost estimation

#### 13. Workflow Execution (`/workflows/:id/run`)
- Input form based on workflow definition
- Real-time execution progress
- Step-by-step execution log
- Results display
- Export results option
- Run again button

#### 14. Workflow Results (`/workflows/:id/results/:executionId`)
- Detailed execution results
- Timeline of steps
- Output data
- Error logs (if any)
- Cost breakdown
- Share results option

#### 15. Templates Marketplace (`/templates`)
- Browse all templates
- Search and filter by category
- Template cards with preview
- Rating and review display
- Install/use template button
- Create from template option

#### 16. Template Detail (`/templates/:id`)
- Template description
- Preview/demo
- Installation instructions
- Customization options
- Reviews and ratings
- Use template button

#### 17. My Templates (`/my-templates`)
- User-created templates
- Published/draft status
- Edit template
- Delete template
- Share template
- View usage statistics

#### 18. Settings (`/settings`)
- Profile settings (name, email, avatar)
- Account settings (password change, 2FA)
- Billing settings (payment method, invoices)
- API keys management
- Notification preferences
- Data export/deletion

#### 19. Billing (`/billing`)
- Current subscription tier
- Usage statistics
- Upgrade/downgrade options
- Invoice history
- Payment method management
- Billing address

#### 20. API Keys (`/api-keys`)
- List of API keys
- Create new API key
- Revoke API key
- Copy API key
- API documentation link

---

### Admin Pages (Admin Only)

#### 21. Admin Dashboard (`/admin`)
- Platform statistics (total users, workflows, revenue)
- User growth chart
- Revenue chart
- Recent activities
- System health status

#### 22. User Management (`/admin/users`)
- List all users
- Search and filter
- User details
- Edit user (tier, status)
- Suspend/delete user
- View user activity

#### 23. Template Management (`/admin/templates`)
- List all templates
- Approve/reject templates
- Feature templates
- Delete templates
- View template analytics

#### 24. Analytics (`/admin/analytics`)
- Platform usage analytics
- User engagement metrics
- Revenue metrics
- Workflow execution statistics
- Performance metrics

#### 25. System Settings (`/admin/settings`)
- Platform configuration
- Email settings
- Payment settings
- Feature flags
- Rate limiting settings

---

## Core Components

### Layout Components
- `Navbar` - Top navigation with logo, menu, user profile
- `Sidebar` - Left sidebar for authenticated users (dashboard, workflows, templates, settings)
- `Footer` - Footer with links and copyright
- `AuthLayout` - Layout for auth pages
- `DashboardLayout` - Layout for authenticated pages

### Workflow Components
- `WorkflowEditor` - Visual workflow builder
- `WorkflowNode` - Individual workflow node
- `WorkflowCanvas` - Canvas for workflow visualization
- `NodeConfigPanel` - Configuration panel for nodes
- `WorkflowPreview` - Preview workflow execution

### Template Components
- `TemplateCard` - Template preview card
- `TemplateGrid` - Grid of templates
- `TemplateDetail` - Detailed template view
- `TemplateCustomizer` - Customize template before use

### Data Components
- `DataTable` - Reusable data table with sorting/filtering
- `Chart` - Reusable chart component
- `StatCard` - Statistics card
- `ProgressBar` - Progress indicator

### Form Components
- `FormInput` - Text input field
- `FormSelect` - Select dropdown
- `FormCheckbox` - Checkbox
- `FormButton` - Submit button
- `FormValidator` - Form validation

### Modal Components
- `ConfirmDialog` - Confirmation modal
- `AlertDialog` - Alert modal
- `FormModal` - Modal with form

---

## Data Models

### User
```
{
  id: string
  email: string
  name: string
  avatar: string
  tier: 'free' | 'starter' | 'pro' | 'enterprise'
  status: 'active' | 'suspended' | 'deleted'
  createdAt: timestamp
  updatedAt: timestamp
  apiKeys: string[]
}
```

### Workflow
```
{
  id: string
  userId: string
  name: string
  description: string
  nodes: Node[]
  edges: Edge[]
  status: 'draft' | 'published'
  createdAt: timestamp
  updatedAt: timestamp
  executionCount: number
  lastExecutedAt: timestamp
}
```

### Template
```
{
  id: string
  name: string
  description: string
  category: string
  nodes: Node[]
  edges: Edge[]
  preview: string
  rating: number
  reviews: Review[]
  usageCount: number
  createdBy: string
  isPublished: boolean
  createdAt: timestamp
}
```

### WorkflowExecution
```
{
  id: string
  workflowId: string
  userId: string
  status: 'pending' | 'running' | 'completed' | 'failed'
  input: object
  output: object
  steps: ExecutionStep[]
  cost: number
  duration: number
  createdAt: timestamp
  completedAt: timestamp
}
```

### ExecutionStep
```
{
  id: string
  nodeId: string
  status: 'pending' | 'running' | 'completed' | 'failed'
  input: object
  output: object
  error: string
  duration: number
  startedAt: timestamp
  completedAt: timestamp
}
```

---

## Navigation Flow

```
Landing Page
├── Sign Up → Onboarding → Dashboard
├── Login → Dashboard
├── Pricing → Sign Up
├── Docs → (Help resources)
└── About → (Company info)

Dashboard
├── Workflows
│   ├── Create New → Workflow Builder → Save/Publish
│   ├── View Workflow → Workflow Detail
│   │   ├── Edit → Workflow Builder
│   │   ├── Run → Workflow Execution
│   │   └── View Results → Results Detail
│   └── Browse Templates → Template Marketplace
├── Templates
│   ├── Browse → Template Detail → Use Template
│   └── My Templates → Edit/Delete
├── Settings
│   ├── Profile
│   ├── Billing
│   └── API Keys
└── Logout → Landing Page

Admin Dashboard
├── Users → User Management
├── Templates → Template Management
├── Analytics → Analytics Dashboard
└── Settings → System Settings
```

---

## State Management

### Global State (Context/Redux)
- User authentication state
- Current user data
- Workflows list
- Templates list
- Notifications
- UI state (sidebar open/close, theme)

### Local State (Component State)
- Form inputs
- Modal visibility
- Loading states
- Error messages

---

## Key Features Implementation

### 1. Workflow Builder
- Drag-and-drop interface
- Node types: Input, AI Agent, Output, Condition, Loop
- Real-time validation
- Cost estimation
- Preview/test mode

### 2. Template System
- Pre-built templates for common workflows
- User-created templates
- Template marketplace with ratings
- One-click template usage

### 3. Execution Engine
- Real-time execution progress
- Step-by-step logging
- Error handling and reporting
- Cost tracking

### 4. Analytics
- User dashboard with key metrics
- Workflow execution analytics
- Usage tracking
- Performance monitoring

### 5. Multi-Tenancy
- User data isolation
- Per-user rate limiting
- Separate API keys per user
- User-specific templates

---

## Design System

### Colors (Modern Dashboard Aesthetic)
- Primary: Cyan (#06B6D4)
- Secondary: Purple (#A78BFA)
- Success: Emerald (#10B981)
- Warning: Amber (#F59E0B)
- Error: Red (#EF4444)
- Background: Slate-900 (#0F172A)
- Surface: Slate-800 (#1E293B)

### Typography
- Display: Space Grotesk Bold (40px, 36px, 28px)
- Body: Outfit Regular (16px)
- Data: Space Mono (14px)

### Components
- Glassmorphic cards with backdrop blur
- Smooth transitions and animations
- Responsive grid layouts
- Mobile-first design

---

## Development Priorities

### Phase 1 (MVP - Weeks 1-2)
- Landing page
- Authentication (signup/login)
- Dashboard
- Workflows list and detail
- Basic workflow builder

### Phase 2 (Weeks 3-4)
- Template marketplace
- Workflow execution
- Results display
- Settings page

### Phase 3 (Weeks 5-6)
- Advanced workflow builder features
- Template creation
- Admin panel
- Analytics

### Phase 4 (Weeks 7+)
- API integration
- Advanced features
- Performance optimization
- Production deployment

