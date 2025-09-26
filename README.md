# The Reading Retreat - Frontend

A modern, responsive blog application frontend built with Next.js 15, React 19, and Tailwind CSS. This is the frontend component of the BlogApp Microservices architecture, designed to provide a seamless reading and blogging experience.

## 🚀 Features

<div align="center">

### ✨ Key Capabilities

</div>

### 🎨 **Modern UI/UX**
- **shadcn/ui** components for consistent design language
- **Tailwind CSS** utility-first design system
- **Responsive** layouts that adapt to any screen size
- **Clean** & **professional** user interface design
- **Accessibility-first** component architecture

### 📱 **Responsive Design**
- **Mobile-first** approach for optimal performance
- **Hamburger menu** navigation for mobile devices
- **Adaptive** layouts that scale beautifully
- **Cross-device** compatibility across all platforms
- **Touch-friendly** interface elements

### 🔐 **Multi-Authentication**
- **Google OAuth 2.0** social login integration
- **Email/Password** traditional authentication
- **JWT** secure token-based authorization
- **Token** automatic refresh mechanism
- **Session** management with secure storage

### ⚡ **Developer Experience**
- **Full TypeScript** support for type safety
- **Component library** system with shadcn/ui
- **Microservices** seamless backend integration
- **Modern tooling** & **best practices**
- **Hot reload** development environment

<div align="center">

### 🏗️ **Architecture Highlights**
[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind](https://img.shields.io/badge/Tailwind-4-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)

</div>

## 🏗️ Architecture Overview

<div align="center">

### 🌟 High-Level System Architecture

```mermaid
graph TB
    subgraph "🌐 Frontend Layer"
        FE[🎨 Next.js 15 Frontend<br/>React 19 + TypeScript<br/>Tailwind CSS + shadcn/ui]
    end
    
    subgraph "🔗 API Gateway Layer"
        HTTP[🔒 HTTPS/JWT Auth<br/>RESTful APIs<br/>JSON Payloads]
    end
    
    subgraph "⚡ Microservices Layer"
        US[🔐 User Service<br/>Port: 5000<br/>Auth & Profiles]
        AS[✍️ Author Service<br/>Port: 5001<br/>Content Creation]
        BS[📝 Blog Service<br/>Port: 5002<br/>Content Management]
    end
    
    subgraph "💾 Database Layer"
        MONGO[(🍃 MongoDB<br/>Users & Profiles<br/>Authentication Data)]
        POSTGRES1[(🐘 PostgreSQL<br/>NeonDB<br/>Blog Content)]
        POSTGRES2[(🐘 PostgreSQL<br/>NeonDB<br/>Comments & Saves)]
    end
    
    subgraph "🚀 Caching & Messaging"
        REDIS[(⚡ Redis Cache<br/>Blog Data<br/>Performance)]
        RABBIT[🐰 RabbitMQ<br/>Message Queue<br/>Cache Invalidation]
    end
    
    subgraph "☁️ External Services"
        GOOGLE[🔍 Google OAuth<br/>Authentication]
        CLOUD[☁️ Cloudinary<br/>Image CDN]
        DOCKER[🐳 Docker Hub<br/>Container Registry]
    end
    
    %% Frontend connections
    FE --> HTTP
    HTTP --> US
    HTTP --> AS  
    HTTP --> BS
    
    %% Service to database connections
    US --> MONGO
    AS --> POSTGRES1
    BS --> POSTGRES2
    BS --> REDIS
    
    %% Inter-service communication
    AS --> RABBIT
    RABBIT --> BS
    BS --> REDIS
    
    %% External service connections
    US --> GOOGLE
    AS --> CLOUD
    FE -.-> DOCKER
    
    %% Styling with high contrast text
    classDef frontend fill:#b3e5fc,stroke:#0277bd,stroke-width:3px,color:#000
    classDef microservice fill:#ffcdd2,stroke:#c62828,stroke-width:2px,color:#000
    classDef database fill:#b2dfdb,stroke:#00695c,stroke-width:2px,color:#000
    classDef cache fill:#fff9c4,stroke:#f57f17,stroke-width:2px,color:#000
    classDef external fill:#d1c4e9,stroke:#4527a0,stroke-width:2px,color:#000
    classDef api fill:#c8e6c9,stroke:#2e7d32,stroke-width:2px,color:#000
    
    class FE frontend
    class US,AS,BS microservice
    class MONGO,POSTGRES1,POSTGRES2 database
    class REDIS,RABBIT cache
    class GOOGLE,CLOUD,DOCKER external
    class HTTP api
```

</div>

### 🔄 Service Communication Flow

<div align="center">

```mermaid
graph TD
    subgraph "🌐 Frontend Application"
        USER[👤 User Interaction]
    end
    
    subgraph "🔐 Authentication Flows"
        OAUTH[🌐 Google OAuth]
        PASS[🔑 Email/Password]
    end
    
    subgraph "✍️ Content Creation Flows"
        CREATE[📝 Create/Edit Blog]
        IMAGE[🖼️ Image Upload]
        AI[🤖 AI Content Generation]
    end
    
    subgraph "📚 Content Consumption Flows"
        BROWSE[🔍 Browse Blogs]
        SEARCH[🔎 Search/Filter]
        COMMENT[💬 Comments]
        SAVE[💾 Save Blogs]
    end
    
    subgraph "⚡ Backend Services"
        US[🔐 User Service<br/>:5000]
        AS[✍️ Author Service<br/>:5001]
        BS[📝 Blog Service<br/>:5002]
    end
    
    subgraph "💾 Data Storage"
        MONGO[(🍃 MongoDB)]
        POSTGRES[(🐘 PostgreSQL)]
        REDIS[(⚡ Redis Cache)]
    end
    
    subgraph "🚀 Infrastructure"
        RABBIT[🐰 RabbitMQ]
        CLOUD[☁️ Cloudinary]
        GOOGLE[🔍 Google API]
    end
    
    %% User interactions
    USER --> OAUTH
    USER --> PASS
    USER --> CREATE
    USER --> IMAGE
    USER --> BROWSE
    USER --> SEARCH
    USER --> COMMENT
    USER --> SAVE
    
    %% Authentication flows
    OAUTH --> US
    PASS --> US
    US --> MONGO
    US --> GOOGLE
    
    %% Content creation flows
    CREATE --> AS
    IMAGE --> AS
    AI --> AS
    AS --> POSTGRES
    AS --> CLOUD
    AS --> RABBIT
    
    %% Content consumption flows
    BROWSE --> BS
    SEARCH --> BS
    COMMENT --> BS
    SAVE --> BS
    BS --> POSTGRES
    BS --> REDIS
    
    %% Cache invalidation
    RABBIT --> BS
    BS --> REDIS
    
    %% Styling with better contrast
    classDef user fill:#e3f2fd,stroke:#1976d2,stroke-width:2px,color:#000
    classDef auth fill:#fff8e1,stroke:#ef6c00,stroke-width:2px,color:#000
    classDef content fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px,color:#000
    classDef consume fill:#e8f5e8,stroke:#2e7d32,stroke-width:2px,color:#000
    classDef service fill:#ffebee,stroke:#c62828,stroke-width:2px,color:#000
    classDef storage fill:#e0f2f1,stroke:#00695c,stroke-width:2px,color:#000
    classDef infra fill:#fce4ec,stroke:#ad1457,stroke-width:2px,color:#000
    
    class USER user
    class OAUTH,PASS auth
    class CREATE,IMAGE,AI content
    class BROWSE,SEARCH,COMMENT,SAVE consume
    class US,AS,BS service
    class MONGO,POSTGRES,REDIS storage
    class RABBIT,CLOUD,GOOGLE infra
```

</div>

## 🔄 Data Flow Patterns

<div align="center">

### 🔐 User Authentication Flow
```mermaid
sequenceDiagram
    participant U as 👤 User
    participant F as 🌐 Frontend
    participant US as 🔐 User Service
    participant G as 🔍 Google OAuth
    participant DB as 🍃 MongoDB
    
    Note over U,DB: Google OAuth Authentication Flow
    
    U->>+F: 1. Click "Login with Google"
    F->>+US: 2. Initialize OAuth
    US->>+G: 3. Redirect to Google
    G->>-U: 4. Google Login Page
    U->>+G: 5. Enter Credentials
    G->>-US: 6. Authorization Code
    US->>+G: 7. Exchange for Token
    G->>-US: 8. Access Token + User Info
    US->>+DB: 9. Store/Update User
    DB->>-US: 10. User Document
    US->>-F: 11. JWT Token + User Data
    F->>-U: 12. Login Success
    
    Note over U,DB: Secure Session Established
    
    rect rgb(200, 255, 200)
        Note right of F: JWT stored securely<br/>Auto-refresh enabled
    end
```

</div>

### ✍️ Blog Creation Flow
```mermaid
sequenceDiagram
    participant A as 👨‍💼 Author
    participant F as 🌐 Frontend
    participant AS as ✍️ Author Service
    participant AI as 🤖 Google AI
    participant C as ☁️ Cloudinary
    participant DB as 🐘 PostgreSQL
    participant MQ as 🐰 RabbitMQ
    participant BS as 📝 Blog Service
    
    Note over A,BS: Content Creation Workflow
    
    A->>+F: 1. Create New Blog
    F->>+AS: 2. POST /blogs (JWT)
    
    par Image Upload
        AS->>+C: 3a. Upload Images
        C->>-AS: 3b. CDN URLs
    and AI Content
        AS->>+AI: 3c. Generate Content
        AI->>-AS: 3d. AI Response
    end
    
    AS->>+DB: 4. Store Blog Data
    DB->>-AS: 5. Blog Document
    
    rect rgb(255, 240, 200)
        Note over AS,BS: Cache Invalidation Process
        AS->>+MQ: 6. Publish Cache Event
        MQ->>+BS: 7. Cache Invalidation
        BS->>-MQ: 8. ACK
        MQ->>-AS: 9. Event Processed
    end
    
    AS->>-F: 10. Blog Created Response
    F->>-A: 11. Success Notification
    
    Note over A,BS: Blog Published & Cached
```

### 📚 Blog Consumption Flow
```mermaid
sequenceDiagram
    participant R as 👁️ Reader
    participant F as 🌐 Frontend
    participant BS as 📝 Blog Service
    participant RC as ⚡ Redis Cache
    participant DB as 🐘 PostgreSQL
    participant US as 🔐 User Service
    
    Note over R,US: Content Discovery & Reading
    
    R->>+F: 1. Browse Blogs
    F->>+BS: 2. GET /blogs
    
    alt Cache Hit
        BS->>+RC: 3a. Check Cache
        RC->>-BS: 3b. Cached Data ✅
        rect rgb(200, 255, 200)
            Note over BS,RC: Fast Response<br/>< 50ms
        end
    else Cache Miss
        BS->>+RC: 3c. Check Cache
        RC->>-BS: 3d. Cache Miss ❌
        BS->>+DB: 4. Query Database
        DB->>-BS: 5. Fresh Data
        BS->>+RC: 6. Update Cache
        RC->>-BS: 7. Cache Updated
        rect rgb(255, 240, 200)
            Note over BS,DB: Database Query<br/>~200-500ms
        end
    end
    
    BS->>-F: 8. Blog List Response
    F->>-R: 9. Display Blogs
    
    opt User Interactions
        R->>+F: 10. Save/Comment
        F->>+US: 11. Verify Auth
        US->>-F: 12. JWT Valid
        F->>+BS: 13. Update Action
        BS->>+DB: 14. Store Action
        DB->>-BS: 15. Success
        BS->>-F: 16. Action Complete
        F->>-R: 17. UI Update
    end
    
    Note over R,US: Optimized User Experience
```

---

## 📱 Application Flow & User Journeys

<div align="center">

### 🌟 Visitor Discovery Journey
```mermaid
journey
    title 🎯 Guest User Experience Journey
    section 🔍 Discovery Phase
      Visit Homepage: 5: 👋 Visitor
      Browse Blog Posts: 4: 📚 Reader
      Read Blog Content: 5: 📖 Explorer
      View Author Profiles: 3: 🧐 Curious
    section 💡 Engagement Phase
      Find Interesting Content: 4: 😍 Interested
      Want to Save Blog: 2: 💔 Frustrated
      Realize Need Account: 3: 🤔 Thoughtful
    section 🚪 Registration Decision
      Choose Auth Method: 4: 🎯 Focused
      Google OAuth Login: 5: 🚀 Excited
      Complete Profile Setup: 4: ✨ Engaged
    section 🎉 First User Actions
      Save Favorite Blogs: 5: 💖 Happy
      Comment on Posts: 4: 💬 Social
      Explore More Content: 5: 🌈 Delighted
```

```mermaid
graph TD
    START([🏠 Landing Page]) --> BROWSE{Browse Blogs?}
    
    BROWSE -->|Yes| BLOGLIST[📚 Blog List Page]
    BROWSE -->|No| AUTH{Want to Login?}
    
    BLOGLIST --> SEARCH[🔍 Search/Filter]
    BLOGLIST --> READ[📖 Read Blog]
    BLOGLIST --> AUTHOR[👤 Author Profile]
    
    READ --> LIKE{Like Content?}
    LIKE -->|Yes| NEEDAUTH[🔐 Need Account]
    LIKE -->|No| BROWSE
    
    NEEDAUTH --> AUTH
    AUTH -->|Yes| LOGIN[🔑 Login Page]
    AUTH -->|No| BROWSE
    
    LOGIN --> OAUTH[🌐 Google OAuth]
    LOGIN --> EMAIL[📧 Email/Password]
    
    OAUTH --> SUCCESS[✅ Login Success]
    EMAIL --> SUCCESS
    
    SUCCESS --> USERFLOW[👤 User Dashboard]
    
    %% Styling with clear text visibility
    classDef startEnd fill:#c8e6c9,stroke:#2e7d32,stroke-width:3px,color:#000
    classDef decision fill:#fff8e1,stroke:#ef6c00,stroke-width:2px,color:#000
    classDef action fill:#e3f2fd,stroke:#1565c0,stroke-width:2px,color:#000
    classDef auth fill:#fce4ec,stroke:#c2185b,stroke-width:2px,color:#000
    
    class START,SUCCESS startEnd
    class BROWSE,LIKE,NEEDAUTH,AUTH decision
    class BLOGLIST,SEARCH,READ,AUTHOR,USERFLOW action
    class LOGIN,OAUTH,EMAIL auth
```

</div>

<div align="center">

### 🎨 Member Experience Overview

</div>

**Authenticated users unlock the full potential of The Reading Retreat platform:**

#### 👤 **Profile Management**
- **Dashboard Access**: Personal overview of saved blogs and activity
- **Profile Customization**: Edit personal information and upload profile pictures
- **Preference Settings**: Customize reading preferences and notifications

#### 🎭 **Content Interaction**  
- **Advanced Browsing**: Full access to all blog content with filtering options
- **Personal Library**: Save favorite blogs to a personal collection
- **Community Engagement**: Comment on posts and interact with other readers

#### ✍️ **Content Creation** (Author Mode)
- **Blog Publishing**: Create and publish original blog content
- **Rich Media**: Upload images and enhance posts with visual elements
- **AI Assistance**: Leverage Google AI for content generation and ideas

#### 🌍 **Community Building**
- **Social Features**: Follow favorite authors and build connections
- **Content Sharing**: Share interesting blogs with others
- **Audience Growth**: Build your own readership as an author

```mermaid
graph TD
    USER([👤 Authenticated User]) --> PROFILE{Profile Actions}
    USER --> CONTENT{Content Actions}
    USER --> CREATE{Create Content?}
    
    PROFILE --> VIEWPROF[📋 View Profile]
    PROFILE --> EDITPROF[✏️ Edit Profile]
    PROFILE --> UPLOADPIC[🖼️ Upload Picture]
    
    CONTENT --> BROWSE[📚 Browse Blogs]
    CONTENT --> SAVED[💾 View Saved]
    CONTENT --> COMMENT[💬 Comment]
    CONTENT --> SEARCH[🔍 Search]
    
    CREATE -->|Yes| AUTHOR[✍️ Become Author]
    CREATE -->|No| CONTENT
    
    AUTHOR --> NEWBLOG[📝 Create Blog]
    AUTHOR --> EDITBLOG[✏️ Edit Blog]
    AUTHOR --> DELBLOG[🗑️ Delete Blog]
    AUTHOR --> IMGUP[🖼️ Upload Images]
    
    NEWBLOG --> AI[🤖 AI Assistance]
    IMGUP --> CDN[☁️ Cloudinary CDN]
    
    BROWSE --> SAVE[💾 Save Blog]
    SAVE --> SAVED
    
    %% Service connections
    VIEWPROF --> US[🔐 User Service]
    EDITPROF --> US
    UPLOADPIC --> US
    UPLOADPIC --> CDN
    
    BROWSE --> BS[📝 Blog Service]
    SAVED --> BS
    COMMENT --> BS
    SEARCH --> BS
    SAVE --> BS
    
    NEWBLOG --> AS[✍️ Author Service]
    EDITBLOG --> AS
    DELBLOG --> AS
    IMGUP --> AS
    AI --> AS
    
    %% Styling with improved readability
    classDef user fill:#c8e6c9,stroke:#2e7d32,stroke-width:3px,color:#000
    classDef profile fill:#e3f2fd,stroke:#1565c0,stroke-width:2px,color:#000
    classDef content fill:#fff8e1,stroke:#ef6c00,stroke-width:2px,color:#000
    classDef author fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px,color:#000
    classDef service fill:#ffcdd2,stroke:#c62828,stroke-width:2px,color:#000
    classDef external fill:#b2dfdb,stroke:#00695c,stroke-width:2px,color:#000
    
    class USER user
    class PROFILE,VIEWPROF,EDITPROF,UPLOADPIC profile
    class CONTENT,BROWSE,SAVED,COMMENT,SEARCH,SAVE content
    class CREATE,AUTHOR,NEWBLOG,EDITBLOG,DELBLOG,IMGUP,AI author
    class US,BS,AS service
    class CDN external
```

### ⚡ Real-time Data Synchronization
```mermaid
sequenceDiagram
    participant A as ✍️ Author
    participant AS as 📝 Author Service
    participant DB as 🐘 PostgreSQL
    participant MQ as 🐰 RabbitMQ
    participant BS as 📚 Blog Service
    participant RC as ⚡ Redis Cache
    participant F as 🌐 Frontend
    participant U as 👥 Users
    
    Note over A,U: Real-time Content Synchronization
    
    rect rgb(240, 248, 255)
        Note over A,AS: Content Creation Phase
        A->>+AS: 1. Create/Update Blog
        AS->>+DB: 2. Save to Database
        DB->>-AS: 3. Success Response
    end
    
    rect rgb(255, 248, 240)
        Note over AS,BS: Cache Invalidation Phase
        AS->>+MQ: 4. Publish Cache Event
        Note right of MQ: Event: {<br/>  type: 'BLOG_UPDATED',<br/>  blogId: '123',<br/>  action: 'invalidate'<br/>}
        MQ->>+BS: 5. Deliver Message
        BS->>+RC: 6. Invalidate Cache Keys
        RC->>-BS: 7. Cache Cleared
        BS->>-MQ: 8. ACK Message
        MQ->>-AS: 9. Delivery Confirmed
    end
    
    AS->>-A: 10. Blog Updated Successfully
    
    rect rgb(248, 255, 248)
        Note over F,U: Fresh Data Delivery
        U->>+F: 11. Request Blog Data
        F->>+BS: 12. API Call
        BS->>+RC: 13. Check Cache
        RC->>-BS: 14. Cache Miss (Fresh)
        BS->>+DB: 15. Query Database
        DB->>-BS: 16. Latest Data
        BS->>+RC: 17. Update Cache
        RC->>-BS: 18. Cache Populated
        BS->>-F: 19. Fresh Blog Data
        F->>-U: 20. Display Updated Content
    end
    
    Note over A,U: Zero-Downtime Data Consistency
```

### 🧩 Component Architecture Flow
```mermaid
graph TD
    subgraph "🏗️ App Layout Structure"
        ROOT[📱 App Layout<br/>layout.tsx]
        ROOT --> NAV[🧭 Navbar Component]
        ROOT --> MAIN[📄 Main Content Area]
    end
    
    subgraph "🧭 Navigation System"
        NAV --> BRAND[🏠 Brand Logo]
        NAV --> MENU[📋 Menu Items]
        NAV --> AUTH[🔐 Auth Status]
        NAV --> MOBILE[📱 Mobile Menu]
        
        MENU --> HOME[🏠 Home Link]
        MENU --> SAVED[💾 Saved Blogs]
        MENU --> PROFILE[👤 Profile]
        
        AUTH --> LOGIN[🔑 Login Button]
        AUTH --> LOGOUT[🚪 Logout Button]
        AUTH --> AVATAR[👤 User Avatar]
    end
    
    subgraph "📄 Page Components"
        MAIN --> HOMEPAGE[🏠 Home Page<br/>/]
        MAIN --> LOGINPAGE[🔑 Login Page<br/>/login]
        MAIN --> REGPAGE[📝 Register Page<br/>/register]
        MAIN --> BLOGPAGE[📖 Blog Detail<br/>/blog/:id]
        MAIN --> EDITPAGE[✏️ Edit Blog<br/>/blog/edit/:id]
        MAIN --> NEWPAGE[➕ New Blog<br/>/blog/new]
        MAIN --> SAVEDPAGE[💾 Saved Blogs<br/>/blog/saved]
        MAIN --> PROFPAGE[👤 Profile<br/>/profile]
        MAIN --> USERPAGE[👥 User Profile<br/>/profile/:id]
    end
    
    subgraph "🎨 UI Components"
        HOMEPAGE --> BLOGCARD[📋 Blog Card]
        HOMEPAGE --> LOADING[⏳ Loading Skeleton]
        HOMEPAGE --> SIDEBAR[📋 Sidebar]
        
        BLOGPAGE --> CONTENT[📝 Blog Content]
        BLOGPAGE --> AUTHOR[👨‍💼 Author Info]
        BLOGPAGE --> COMMENTS[💬 Comments Section]
        
        LOGINPAGE --> OAUTH[🌐 OAuth Button]
        LOGINPAGE --> FORM[📝 Login Form]
    end
    
    subgraph "🔧 Shared Components"
        SHARED[🔧 ui/ Components]
        SHARED --> BUTTON[🔘 Button]
        SHARED --> CARD[📄 Card]
        SHARED --> INPUT[📝 Input]
        SHARED --> DIALOG[💬 Dialog]
        SHARED --> AVATAR_COMP[👤 Avatar]
        SHARED --> TOOLTIP[💡 Tooltip]
        SHARED --> SKELETON[⏳ Skeleton]
        SHARED --> SELECT[📋 Select]
        SHARED --> SEPARATOR[➖ Separator]
        SHARED --> SHEET[📱 Sheet]
    end
    
    %% Component usage connections
    BLOGCARD -.-> BUTTON
    BLOGCARD -.-> CARD
    AUTHOR -.-> AVATAR_COMP
    LOADING -.-> SKELETON
    FORM -.-> INPUT
    FORM -.-> BUTTON
    OAUTH -.-> BUTTON
    COMMENTS -.-> DIALOG
    NAVBAR -.-> SHEET
    
    %% Styling with optimal contrast
    classDef layout fill:#c8e6c9,stroke:#2e7d32,stroke-width:3px,color:#000
    classDef navigation fill:#e3f2fd,stroke:#1565c0,stroke-width:2px,color:#000
    classDef pages fill:#fff8e1,stroke:#ef6c00,stroke-width:2px,color:#000
    classDef components fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px,color:#000
    classDef shared fill:#ffcdd2,stroke:#c62828,stroke-width:2px,color:#000
    
    class ROOT,NAV,MAIN layout
    class BRAND,MENU,AUTH,MOBILE,HOME,SAVED,PROFILE,LOGIN,LOGOUT,AVATAR navigation
    class HOMEPAGE,LOGINPAGE,REGPAGE,BLOGPAGE,EDITPAGE,NEWPAGE,SAVEDPAGE,PROFPAGE,USERPAGE pages
    class BLOGCARD,LOADING,SIDEBAR,CONTENT,AUTHOR,COMMENTS,OAUTH,FORM components
    class SHARED,BUTTON,CARD,INPUT,DIALOG,AVATAR_COMP,TOOLTIP,SKELETON,SELECT,SEPARATOR,SHEET shared
```

## 🔧 Technical Implementation Details

### 🔌 **API Integration Patterns**
```typescript
// Authentication Header Pattern
const apiCall = async (endpoint: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('jwt_token');
  
  return fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
};

// Service Endpoints
const SERVICES = {
  USER: 'http://localhost:5000/api/v1',
  AUTHOR: 'http://localhost:5001/api/v1', 
  BLOG: 'http://localhost:5002/api/v1'
};
```

### 🔄 **State Management Flow**
```
User Action (UI Event)
    │
    ▼
React Component State Update
    │
    ▼
API Call to Microservice
    │
    ▼
Backend Processing
    │
    ▼
Response with Updated Data
    │
    ▼
Component Re-render
    │
    ▼
UI Update
```

### ⚡ Advanced Caching Strategy
```mermaid
graph TD
    subgraph "🌐 Frontend Layer"
        USER[👤 User Request]
        BROWSER[🌐 Browser Cache]
    end
    
    subgraph "📝 Blog Service Layer"
        BS[📝 Blog Service]
        LOGIC[🧠 Cache Logic]
    end
    
    subgraph "⚡ Caching Layer"
        REDIS[⚡ Redis Cache]
        L1[🚀 L1: Hot Data<br/>TTL: 5min]
        L2[🔥 L2: Warm Data<br/>TTL: 1hr]
        L3[❄️ L3: Cold Data<br/>TTL: 24hr]
    end
    
    subgraph "💾 Database Layer"
        DB[🐘 PostgreSQL]
        ANALYTICS[📊 Query Analytics]
    end
    
    subgraph "🔄 Cache Management"
        MQ[🐰 RabbitMQ]
        INVALID[🗑️ Invalidation Logic]
        PREBUILD[🏗️ Cache Rebuilding]
    end
    
    %% User flow
    USER --> BROWSER
    BROWSER --> BS
    BS --> LOGIC
    
    %% Cache hierarchy
    LOGIC --> L1
    L1 -->|Miss| L2
    L2 -->|Miss| L3
    L3 -->|Miss| DB
    
    %% Cache management
    DB --> ANALYTICS
    ANALYTICS --> PREBUILD
    PREBUILD --> REDIS
    
    %% Invalidation flow
    MQ --> INVALID
    INVALID --> L1
    INVALID --> L2
    INVALID --> L3
    
    %% Performance metrics
    L1 -.->|<10ms| USER
    L2 -.->|<50ms| USER
    L3 -.->|<100ms| USER
    DB -.->|200-500ms| USER
    
    %% Styling with improved contrast
    classDef frontend fill:#e3f2fd,stroke:#1976d2,stroke-width:2px,color:#000
    classDef service fill:#fff8e1,stroke:#f57c00,stroke-width:2px,color:#000
    classDef cache fill:#e8f5e8,stroke:#2e7d32,stroke-width:2px,color:#000
    classDef database fill:#fce4ec,stroke:#c2185b,stroke-width:2px,color:#000
    classDef management fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px,color:#000
    classDef performance fill:#ffebee,stroke:#d32f2f,stroke-width:1px,stroke-dasharray: 5 5,color:#000
    
    class USER,BROWSER frontend
    class BS,LOGIC service
    class REDIS,L1,L2,L3 cache
    class DB,ANALYTICS database
    class MQ,INVALID,PREBUILD management
```

---

## 🛠️ Tech Stack

<div align="center">

### 🎯 Technology Overview

</div>

### 🚀 **Frontend Framework**
- **Next.js 15.x** - React framework with Server-Side Rendering and App Router
- **React 19.x** - Modern UI library with latest concurrent features
- **TypeScript 5.x** - Enhanced type safety and developer experience
- **App Router** - File-based routing with nested layouts and streaming

### 🎨 **Styling & UI**
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS framework for rapid styling
- **[shadcn/ui](https://ui.shadcn.com/)** - Modern, accessible React component library
- **[Radix UI](https://www.radix-ui.com/)** - Unstyled, accessible UI primitives
- **[Lucide React](https://lucide.dev/)** - Beautiful, customizable SVG icon library
- **CSS Variables** - Dynamic theming with custom properties

### 🔐 **Authentication & Security**
- **Google OAuth 2.0** - Secure social authentication integration
- **JWT (JSON Web Tokens)** - Stateless, secure authorization mechanism
- **HTTP-only Cookies** - XSS protection for sensitive data storage
- **Multi-factor Authentication** - Email/password + social login options
- **Token Auto-refresh** - Seamless session management

### 🔧 **Development Tools**
- **`clsx` + `tailwind-merge`** - Intelligent CSS class management
- **`class-variance-authority`** - Type-safe component variant system
- **ESLint** - Code quality and consistency enforcement
- **PostCSS** - Advanced CSS processing and optimization
- **Full TypeScript Support** - Enhanced IntelliSense and error catching

### 🔗 **Backend Integration**
- **RESTful APIs** - Clean, consistent API communication patterns
- **[User Service](https://github.com/sajjad6ansari/BlogApp-UserService)** - Authentication and user management
- **[Author Service](https://github.com/sajjad6ansari/BlogApp-AuthorService)** - Content creation and author operations  
- **[Blog Service](https://github.com/sajjad6ansari/BlogApp-BlogService)** - Blog content storage and retrieval

## 📁 Complete Project Structure

This project is part of a comprehensive microservices architecture. Below is the complete structure including all services:

### 🌐 **Frontend Application (This Repository)**
```
frontend/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── favicon.ico        # App favicon
│   │   ├── globals.css        # Global styles and CSS variables
│   │   ├── layout.tsx         # Root layout component
│   │   ├── page.tsx          # Home page
│   │   ├── blog/
│   │   │   ├── [id]/
│   │   │   │   └── page.tsx  # Blog detail page
│   │   │   ├── edit/
│   │   │   │   └── [id]/
│   │   │   │       └── page.tsx  # Edit blog page
│   │   │   ├── new/
│   │   │   │   └── page.tsx  # Create new blog page
│   │   │   └── saved/
│   │   │       └── page.tsx  # Saved blogs page
│   │   ├── blogs/
│   │   │   ├── layout.tsx    # Blogs layout
│   │   │   └── page.tsx      # All blogs page
│   │   ├── login/
│   │   │   └── page.tsx      # Login page
│   │   ├── register/
│   │   │   └── page.tsx      # Registration page
│   │   └── profile/
│   │       ├── page.tsx      # User profile page
│   │       └── [id]/
│   │           └── page.tsx  # Other user's profile
│   ├── components/
│   │   ├── BlogCard.tsx      # Blog card component
│   │   ├── loading.tsx       # Loading component
│   │   ├── navbar.tsx        # Navigation component
│   │   ├── sidebar.tsx       # Sidebar component
│   │   └── ui/               # Reusable UI components
│   │       ├── avatar.tsx    # Avatar component
│   │       ├── button.tsx    # Button component with variants
│   │       ├── card.tsx      # Card component
│   │       ├── dialog.tsx    # Dialog component
│   │       ├── input.tsx     # Input component
│   │       └── ...           # Other shadcn/ui components
│   ├── context/
│   │   └── AppContext.tsx    # Global application context
│   ├── hooks/
│   │   └── use-mobile.ts     # Mobile detection hook
│   └── lib/
│       └── utils.ts          # Utility functions
├── public/                   # Static assets
├── components.json           # shadcn/ui configuration
├── next.config.ts           # Next.js configuration
├── package.json             # Dependencies and scripts
├── tailwind.config.js       # Tailwind CSS configuration
└── tsconfig.json            # TypeScript configuration
```

### 🔐 **User Service** - [📖 Detailed Documentation](https://github.com/sajjad6ansari/BlogApp-UserService)
*Authentication, user management, and profile operations*
```
user-service/
├── src/
│   ├── controllers/
│   │   └── user.ts          # User management logic
│   │   └── auth/
│   │       └── auth.ts      # Authentication controllers
│   ├── middleware/
│   │   ├── isAuth.ts        # JWT authentication middleware
│   │   └── multer.ts        # File upload middleware
│   ├── model/
│   │   └── User.ts          # User data model (MongoDB)
│   ├── routes/
│   │   └── user.ts          # User API routes
│   ├── utils/
│   │   ├── dataUri.ts       # Data URI utilities
│   │   ├── db.ts            # Database connection
│   │   ├── GoogleConfig.ts  # Google OAuth configuration
│   │   └── TryCatch.ts      # Error handling wrapper
│   └── server.ts            # Express server setup
├── Dockerfile               # Container configuration
├── package.json             # Dependencies
└── tsconfig.json            # TypeScript config
```

### ✍️ **Author Service** - [📖 Detailed Documentation](https://github.com/sajjad6ansari/BlogApp-AuthorService)
*Content creation, blog authoring, and media management*
```
author-service/
├── src/
│   ├── controllers/
│   │   └── blog.ts          # Blog creation and management
│   ├── middlewares/
│   │   ├── isAuth.ts        # JWT verification
│   │   └── multer.ts        # Image upload handling
│   ├── routes/
│   │   └── blog.ts          # Author-specific blog routes
│   ├── utils/
│   │   ├── dataUri.ts       # Image processing utilities
│   │   ├── db.ts            # PostgreSQL connection
│   │   ├── rabbitmq.ts      # Message queue integration
│   │   └── TryCatch.ts      # Error handling
│   └── server.ts            # Express server
├── Dockerfile               # Docker configuration
├── package.json             # Dependencies
└── tsconfig.json            # TypeScript config
```

### 📝 **Blog Service** - [📖 Detailed Documentation](https://github.com/sajjad6ansari/BlogApp-BlogService)
*Blog consumption, caching, comments, and content delivery*
```
blog-service/
├── src/
│   ├── controllers/
│   │   └── blog.ts          # Blog retrieval and management
│   ├── middleware/
│   │   └── isAuth.ts        # Authentication middleware
│   ├── routes/
│   │   └── blog.ts          # Blog consumption routes
│   ├── utils/
│   │   ├── consumer.ts      # RabbitMQ message consumer
│   │   ├── db.ts            # PostgreSQL connection
│   │   └── TryCatch.ts      # Error handling utilities
│   └── server.ts            # Express server setup
├── Dockerfile               # Container configuration
├── package.json             # Dependencies
└── tsconfig.json            # TypeScript config
```

### 🗂️ **Microservices Communication**
Each service operates independently with the following integration points:

- **🔗 API Endpoints**: RESTful APIs on different ports (5000, 5001, 5002)
- **🔐 Authentication**: Shared JWT token validation across services
- **📡 Messaging**: RabbitMQ for inter-service communication and cache invalidation
- **💾 Databases**: MongoDB (User Service) + PostgreSQL (Author/Blog Services)
- **⚡ Caching**: Redis integration in Blog Service for performance optimization

> **📚 For comprehensive implementation details, setup instructions, and API documentation, please refer to each service's dedicated repository linked above.**

## 🚀 Getting Started

### 📋 **Prerequisites**

- **Node.js 18+** - JavaScript runtime environment
- **Package Manager** - npm, yarn, pnpm, or bun

### 📦 **Installation**

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd BlogApp_Microservices/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnmp install
   # or
   bun install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint for code linting

## 🎨 UI Components

The project uses shadcn/ui components with the "new-york" style configuration:

- **Button**: Multiple variants (default, destructive, outline, secondary, ghost, link)
- **Card**: Flexible card components with header, content, and footer sections
- **Navigation**: Responsive navbar with mobile menu support

### ⚙️ **Component Configuration**

The UI components are configured via `components.json`:
- **Style**: new-york
- **Base Color**: slate
- **CSS Variables**: Enabled
- **Icon Library**: lucide
- **RSC**: React Server Components enabled

## 🎯 Key Features

### 🧭 **Navigation**
- **Brand**: "The Reading Retreat"
- **Menu Items**: 
  - Home
  - Saved Blogs (authentication-dependent)
  - Login/Profile (context-dependent)
- **Mobile Responsive**: Collapsible hamburger menu
- **Icons**: Lucide icons for visual clarity

### 🎨 **Theming**
- **CSS Variables**: Custom properties for consistent theming
- **Dark Mode Ready**: Theme configuration supports dark mode
- **Custom Colors**: Comprehensive color palette with semantic naming
- **Radius Variables**: Consistent border radius across components

## 🔗 Microservices Integration

This frontend is fully integrated with the following backend microservices:

### 🔐 User Service
- **Repository**: [BlogApp-UserService](https://github.com/sajjad6ansari/BlogApp-UserService)
- **Features**: 
  - User registration and profile management
  - Password-based authentication
  - Google OAuth integration
  - JWT token generation and validation

### ✍️ Author Service  
- **Repository**: [BlogApp-AuthorService](https://github.com/sajjad6ansari/BlogApp-AuthorService)
- **Features**:
  - Author profile management
  - Author-specific blog operations
  - Content creation and editing capabilities

### 📝 Blog Service
- **Repository**: [BlogApp-BlogService](https://github.com/sajjad6ansari/BlogApp-BlogService) 
- **Features**:
  - Blog post management (CRUD operations)
  - Blog content storage and retrieval
  - Blog categorization and tagging

### 🔑 Authentication & Authorization
- **OAuth Provider**: Google OAuth 2.0 for social login
- **Traditional Auth**: Email/password-based authentication
- **Authorization**: JWT (JSON Web Token) based authorization
- **Security**: Secure token handling and refresh mechanisms

## 📱 Responsive Design

- **Mobile First**: Designed with mobile-first approach
- **Breakpoints**: Tailwind CSS responsive breakpoints
- **Navigation**: Adaptive navigation for different screen sizes
- **Components**: All UI components are responsive by default

## 🚧 Development Notes

### Current State
- ✅ **Microservices Integration**: Connected with User, Author, and Blog services
- ✅ **Authentication System**: Google OAuth and password-based login implemented
- ✅ **JWT Authorization**: Secure token-based authorization in place
- ✅ **Responsive UI**: Navigation component with mobile-responsive design
- ✅ **Component Library**: shadcn/ui components fully configured
- ✅ **API Integration**: RESTful API communication with backend services

### Future Enhancements
- Enhanced user profile management interface
- Advanced blog editor with rich text capabilities
- Real-time notifications system
- Blog search and filtering functionality
- Comment system integration
- Social sharing features
- Progressive Web App (PWA) capabilities

## 🏗️ Architecture Overview

This frontend is the client-side component of a comprehensive microservices architecture:

### 🔄 Service Communication
- **Protocol**: RESTful APIs with JSON payloads
- **Authentication**: Bearer token (JWT) in Authorization headers
- **Error Handling**: Centralized error handling for API responses
- **Request Interceptors**: Automatic token attachment and refresh

### 🛡️ Security Implementation
- **JWT Tokens**: Secure storage and automatic refresh
- **OAuth Flow**: Google OAuth 2.0 integration
- **Protected Routes**: Route guards for authenticated pages
- **CORS**: Proper cross-origin resource sharing configuration

### 🔗 Service Dependencies
```
Frontend Application
├── User Service (Authentication & User Management)
├── Author Service (Content Creation & Management)  
└── Blog Service (Content Storage & Retrieval)
```

### 📊 Data Flow
1. **Authentication**: User login → JWT token → Secure API calls
2. **Content Creation**: Author creates → Author Service → Blog Service
3. **Content Consumption**: Reader requests → Blog Service → Frontend display

## 📄 License

This project is part of the BlogApp Microservices architecture.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add appropriate tests
5. Submit a pull request

## 📞 Support

For questions and support regarding the frontend application, please refer to the main project documentation or create an issue in the repository.
