# Icon Replacement Guide - Use Lucide Icons Only

## ❌ NO EMOJIS - Use Lucide React Icons Instead

All emojis must be replaced with Lucide React icons for a professional, consistent look.

## 📦 Install Lucide React (if not installed)
```bash
npm install lucide-react
```

## 🔄 Emoji to Icon Mapping

### Common Replacements

| Emoji | Lucide Icon | Import |
|-------|-------------|--------|
| 🔒 | `Lock` | `import { Lock } from 'lucide-react'` |
| ✅ | `CheckCircle` or `Check` | `import { CheckCircle } from 'lucide-react'` |
| ❌ | `XCircle` or `X` | `import { XCircle } from 'lucide-react'` |
| ⚠️ | `AlertTriangle` | `import { AlertTriangle } from 'lucide-react'` |
| 📈 | `TrendingUp` | `import { TrendingUp } from 'lucide-react'` |
| 📉 | `TrendingDown` | `import { TrendingDown } from 'lucide-react'` |
| 💰 | `DollarSign` or `Coins` | `import { DollarSign } from 'lucide-react'` |
| 🏆 | `Trophy` | `import { Trophy } from 'lucide-react'` |
| ⚡ | `Zap` or `Bolt` | `import { Zap } from 'lucide-react'` |
| 🔥 | `Flame` | `import { Flame } from 'lucide-react'` |
| 📊 | `BarChart3` | `import { BarChart3 } from 'lucide-react'` |
| 📧 | `Mail` | `import { Mail } from 'lucide-react'` |
| 👤 | `User` | `import { User } from 'lucide-react'` |
| 🛡️ | `Shield` | `import { Shield } from 'lucide-react'` |
| 👥 | `Users` | `import { Users } from 'lucide-react'` |
| ⭐ | `Star` | `import { Star } from 'lucide-react'` |
| 🎯 | `Target` | `import { Target } from 'lucide-react'` |
| 📱 | `Smartphone` | `import { Smartphone } from 'lucide-react'` |
| 💡 | `Lightbulb` | `import { Lightbulb } from 'lucide-react'` |
| 🔔 | `Bell` | `import { Bell } from 'lucide-react'` |
| ⚙️ | `Settings` | `import { Settings } from 'lucide-react'` |
| 🔍 | `Search` | `import { Search } from 'lucide-react'` |
| ➡️ | `ArrowRight` | `import { ArrowRight } from 'lucide-react'` |
| ⬅️ | `ArrowLeft` | `import { ArrowLeft } from 'lucide-react'` |
| ⬆️ | `ArrowUp` | `import { ArrowUp } from 'lucide-react'` |
| ⬇️ | `ArrowDown` | `import { ArrowDown } from 'lucide-react'` |

### Trading-Specific Icons

| Use Case | Icon | Import |
|----------|------|--------|
| Profit/Buy | `TrendingUp` | `import { TrendingUp } from 'lucide-react'` |
| Loss/Sell | `TrendingDown` | `import { TrendingDown } from 'lucide-react'` |
| Portfolio | `Briefcase` | `import { Briefcase } from 'lucide-react'` |
| Wallet | `Wallet` | `import { Wallet } from 'lucide-react'` |
| Chart | `LineChart` or `BarChart3` | `import { LineChart } from 'lucide-react'` |
| Activity | `Activity` | `import { Activity } from 'lucide-react'` |
| Candlestick | `CandlestickChart` | `import { CandlestickChart } from 'lucide-react'` |
| Pie Chart | `PieChart` | `import { PieChart } from 'lucide-react'` |

## 🎨 Icon Styling Rules

### Size
```jsx
// Standard size (22px)
<TrendingUp className="w-[22px] h-[22px]" />

// Small (16px)
<Check className="w-4 h-4" />

// Large (32px)
<Trophy className="w-8 h-8" />
```

### Colors
```jsx
// Default (muted)
<Icon className="text-[#6B7280]" />

// Profit (green)
<TrendingUp className="text-[#6A994E]" />

// Loss (red)
<TrendingDown className="text-[#BC4749]" />

// Reward (gold)
<Trophy className="text-[#E9C46A]" />

// Active
<Icon className="text-[#1F2933]" />
```

### Stroke Width
```jsx
// Default
<Icon className="stroke-[1.8]" />

// Thicker (for emphasis)
<Icon className="stroke-[2]" />

// Thinner
<Icon className="stroke-[1.5]" />
```

## 🔄 Find & Replace Patterns

Use VS Code Find & Replace to remove emojis:

### Pattern 1: Remove emoji in text
```
Find: [🔒✅❌⚠️📈📉💰🏆⚡🔥📊📧👤🛡️👥⭐🎯📱💡🔔⚙️🔍➡️⬅️⬆️⬇️]
Replace: (leave empty or replace with icon component)
```

### Pattern 2: Find emoji in JSX
```
Find: >[🔒✅❌⚠️📈📉💰🏆⚡🔥📊📧👤🛡️👥⭐🎯📱💡🔔⚙️🔍➡️⬅️⬆️⬇️]<
Replace: ><Icon /><
```

## 📝 Example Conversions

### Before (with emoji)
```jsx
<div className="flex items-center gap-2">
  <span>🔒</span>
  <span>Secure</span>
</div>
```

### After (with Lucide icon)
```jsx
import { Lock } from 'lucide-react'

<div className="flex items-center gap-2">
  <Lock className="w-[22px] h-[22px] text-[#6B7280]" />
  <span>Secure</span>
</div>
```

### Before (emoji in button)
```jsx
<button>
  🏆 Rewards
</button>
```

### After (icon in button)
```jsx
import { Trophy } from 'lucide-react'

<button className="flex items-center gap-2">
  <Trophy className="w-[22px] h-[22px]" />
  <span>Rewards</span>
</button>
```

## 🎯 Files to Check for Emojis

Run this search in VS Code:
```
Find: [🔒✅❌⚠️📈📉💰🏆⚡🔥📊📧👤🛡️👥⭐🎯📱💡🔔⚙️🔍➡️⬅️⬆️⬇️]
In: frontend/**/*.{tsx,jsx,ts,js}
```

Common locations:
- Authentication pages
- Dashboard components
- Landing page
- Button components
- Card components
- Navigation components

## ✅ Benefits of Using Icons

1. **Consistent sizing** - All icons same size
2. **Customizable colors** - Match your design system
3. **Scalable** - Look sharp at any size
4. **Professional** - No emoji rendering differences
5. **Accessible** - Better for screen readers
6. **Themeable** - Easy to change colors

## 🚀 Quick Action

1. Search for emojis: `Ctrl+Shift+F` → search for emoji pattern
2. Replace with Lucide icons
3. Import the icons at top of file
4. Apply proper styling (size, color, stroke)
5. Test the page

---

**Remember: ALWAYS use Lucide React icons, NEVER use emojis!**
