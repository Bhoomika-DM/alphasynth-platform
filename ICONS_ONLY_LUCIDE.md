# ⚠️ CRITICAL: Use Lucide Icons ONLY - NO EMOJIS!

## 🚫 NEVER Use Emojis

Emojis are:
- ❌ Inconsistent across platforms
- ❌ Not customizable
- ❌ Look unprofessional
- ❌ Hard to size properly
- ❌ Poor accessibility

## ✅ ALWAYS Use Lucide React Icons

Lucide icons are:
- ✅ Consistent everywhere
- ✅ Fully customizable
- ✅ Professional appearance
- ✅ Perfect sizing
- ✅ Great accessibility
- ✅ Based on Tabler/Feather style

## 📦 Installation

```bash
npm install lucide-react
```

## 🎨 Standard Icon Styling

```jsx
import { IconName } from 'lucide-react'

<IconName 
  className="w-[22px] h-[22px] text-[#6B7280] stroke-[1.8]" 
/>
```

### Size Standards
- **Standard**: `w-[22px] h-[22px]` (most common)
- **Small**: `w-4 h-4` (16px)
- **Large**: `w-8 h-8` (32px)

### Stroke Width
- **Standard**: `stroke-[1.8]`
- **Bold**: `stroke-[2]`
- **Light**: `stroke-[1.5]`

### Colors
- **Default**: `text-[#6B7280]` (muted gray)
- **Profit**: `text-[#6A994E]` (green)
- **Loss**: `text-[#BC4749]` (red)
- **Reward**: `text-[#E9C46A]` (gold)
- **Active**: `text-[#1F2933]` (dark)

## 📊 Trading App Icon Library

### Market & Trading
```jsx
import { 
  TrendingUp,      // Profit, bullish
  TrendingDown,    // Loss, bearish
  LineChart,       // Charts, analysis
  BarChart3,       // Bar charts
  CandlestickChart,// Candlestick charts
  PieChart,        // Portfolio distribution
  Activity,        // Market activity
  ArrowUp,         // Price up
  ArrowDown,       // Price down
} from 'lucide-react'
```

### Money & Finance
```jsx
import {
  DollarSign,      // Money, price
  Coins,           // Coins, crypto
  Wallet,          // Wallet, balance
  CreditCard,      // Payment
  Briefcase,       // Portfolio
  TrendingUp,      // Growth
} from 'lucide-react'
```

### Rewards & Gamification
```jsx
import {
  Trophy,          // Achievement, winner
  Star,            // Rating, favorite
  Award,           // Badge, reward
  Zap,             // XP, energy
  Flame,           // Streak, hot
  Target,          // Goal, target
} from 'lucide-react'
```

### User & Account
```jsx
import {
  User,            // Single user
  Users,           // Multiple users
  UserCircle,      // Profile
  UserPlus,        // Add user
  UserCheck,       // Verified user
} from 'lucide-react'
```

### Navigation
```jsx
import {
  ArrowRight,      // Next, forward
  ArrowLeft,       // Back, previous
  ChevronRight,    // Expand, more
  ChevronLeft,     // Collapse, less
  ChevronUp,       // Up
  ChevronDown,     // Down
  Menu,            // Hamburger menu
  X,               // Close
} from 'lucide-react'
```

### Status & Feedback
```jsx
import {
  CheckCircle,     // Success, completed
  XCircle,         // Error, failed
  AlertTriangle,   // Warning
  AlertCircle,     // Info
  Info,            // Information
  HelpCircle,      // Help, question
} from 'lucide-react'
```

### Actions
```jsx
import {
  Plus,            // Add
  Minus,           // Remove
  Edit,            // Edit
  Trash2,          // Delete
  Save,            // Save
  Download,        // Download
  Upload,          // Upload
  Share2,          // Share
  Copy,            // Copy
  RefreshCw,       // Refresh
} from 'lucide-react'
```

### Security
```jsx
import {
  Lock,            // Locked, secure
  Unlock,          // Unlocked
  Shield,          // Protection
  ShieldCheck,     // Verified
  Key,             // Password, key
  Eye,             // Show
  EyeOff,          // Hide
} from 'lucide-react'
```

### Communication
```jsx
import {
  Mail,            // Email
  MessageCircle,   // Chat, message
  Bell,            // Notification
  BellOff,         // Muted
  Phone,           // Call
  Send,            // Send message
} from 'lucide-react'
```

### Settings & Tools
```jsx
import {
  Settings,        // Settings
  Sliders,         // Filters, adjust
  Filter,          // Filter
  Search,          // Search
  Calendar,        // Date, calendar
  Clock,           // Time
  Globe,           // Global, world
} from 'lucide-react'
```

## 💡 Usage Examples

### Profit Indicator
```jsx
import { TrendingUp } from 'lucide-react'

<div className="flex items-center gap-2">
  <TrendingUp className="w-[22px] h-[22px] text-[#6A994E] stroke-[1.8]" />
  <span className="text-[#6A994E] font-semibold">+5.2%</span>
</div>
```

### Loss Indicator
```jsx
import { TrendingDown } from 'lucide-react'

<div className="flex items-center gap-2">
  <TrendingDown className="w-[22px] h-[22px] text-[#BC4749] stroke-[1.8]" />
  <span className="text-[#BC4749] font-semibold">-2.1%</span>
</div>
```

### Reward Badge
```jsx
import { Trophy } from 'lucide-react'

<div className="flex items-center gap-2 bg-[#E9C46A]/10 px-3 py-1.5 rounded-lg">
  <Trophy className="w-[22px] h-[22px] text-[#E9C46A] stroke-[1.8]" />
  <span className="text-[#E9C46A] font-bold">Level 5</span>
</div>
```

### Button with Icon
```jsx
import { ArrowRight } from 'lucide-react'

<button className="flex items-center gap-2 bg-[#6A994E] text-white px-4 py-2 rounded-[10px]">
  <span>Get Started</span>
  <ArrowRight className="w-[22px] h-[22px] stroke-[1.8]" />
</button>
```

### Security Indicator
```jsx
import { Lock } from 'lucide-react'

<div className="flex items-center gap-2 text-[#6B7280]">
  <Lock className="w-[22px] h-[22px] stroke-[1.8]" />
  <span className="text-[14px]">Secure & Encrypted</span>
</div>
```

## 🔄 Migration: Replace All Emojis

### Step 1: Find Emojis
Search in VS Code:
```
Find: [🔒✅❌⚠️📈📉💰🏆⚡🔥📊📧👤🛡️👥⭐🎯📱💡🔔⚙️🔍➡️⬅️⬆️⬇️]
```

### Step 2: Replace with Icons
For each emoji found:
1. Import the corresponding Lucide icon
2. Replace emoji with icon component
3. Add proper styling

### Step 3: Test
- Check all pages
- Verify icon sizes
- Confirm colors match design system

## ✅ Checklist

Before committing code:
- [ ] No emojis in JSX
- [ ] All icons from lucide-react
- [ ] Icons are 22px (standard)
- [ ] Stroke width is 1.8
- [ ] Colors match design system
- [ ] Icons have proper spacing
- [ ] Accessible (aria-label if needed)

---

**REMEMBER: Professional apps use icons, not emojis!**
