'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { IconArrowLeft, IconUser, IconTrendingUp, IconTarget, IconShield, IconClock, IconEdit, IconCheck } from '@tabler/icons-react'
import Link from 'next/link'

export default function ProfilePage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [editing, setEditing] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [userType, setUserType] = useState<'individual' | 'institutional'>('individual')
  const [profileData, setProfileData] = useState({
    // Individual fields
    experience: '',
    investment_goal: '',
    risk_tolerance: '',
    investment_horizon: '',
    // Institutional fields
    institution_type: '',
    primary_use_case: '',
    assets_under_management: '',
    team_size: ''
  })
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    loadProfile()
  }, [])

  const loadProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        router.push('/signin')
        return
      }

      setUser(user)

      // Load profile data from database
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single()

      if (data) {
        setUserType(data.user_type || 'individual')
        setProfileData({
          experience: data.experience || '',
          investment_goal: data.investment_goal || '',
          risk_tolerance: data.risk_tolerance || '',
          investment_horizon: data.investment_horizon || '',
          institution_type: data.institution_type || '',
          primary_use_case: data.primary_use_case || '',
          assets_under_management: data.assets_under_management || '',
          team_size: data.team_size || ''
        })
      }
    } catch (error) {
      console.error('Error loading profile:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const updateData: any = {
        user_id: user.id,
        user_type: userType,
        updated_at: new Date().toISOString()
      }

      if (userType === 'individual') {
        updateData.experience = profileData.experience
        updateData.investment_goal = profileData.investment_goal
        updateData.risk_tolerance = profileData.risk_tolerance
        updateData.investment_horizon = profileData.investment_horizon
      } else {
        updateData.institution_type = profileData.institution_type
        updateData.primary_use_case = profileData.primary_use_case
        updateData.assets_under_management = profileData.assets_under_management
        updateData.team_size = profileData.team_size
      }

      const { error } = await supabase
        .from('user_profiles')
        .upsert(updateData)

      if (error) {
        console.error('Error saving profile:', error)
        alert('Failed to save profile')
      } else {
        setEditing(false)
        alert('Profile updated successfully!')
      }
    } catch (error) {
      console.error('Error saving profile:', error)
      alert('Failed to save profile')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F9FB] flex items-center justify-center">
        <div className="text-[#2D3748]">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F8F9FB]">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/dashboard"
            className="inline-flex items-center gap-2 text-[#718096] hover:text-[#2D3748] transition-colors duration-200 mb-4 text-sm"
          >
            <IconArrowLeft className="w-4 h-4" stroke={1.5} />
            Back to Dashboard
          </Link>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-[32px] font-bold text-[#2D3748] mb-2">
                Your Profile
              </h1>
              <p className="text-[16px] text-[#718096]">
                Manage your investment preferences
              </p>
            </div>
            
            {!editing ? (
              <button
                onClick={() => setEditing(true)}
                className="px-6 py-3 bg-[#0D7C8C] border border-[#2E4D8E]/30 rounded-lg hover:bg-[#2E4D8E] transition-all duration-200 flex items-center gap-2"
              >
                <IconEdit className="w-5 h-5 text-[#2D3748]" stroke={1.5} />
                <span className="text-sm font-semibold text-[#2D3748]">Edit Profile</span>
              </button>
            ) : (
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-6 py-3 bg-[#2E4D8E] border border-[#2E4D8E]/30 rounded-lg hover:bg-[#5A8A4E] transition-all duration-200 flex items-center gap-2 disabled:opacity-50"
              >
                <IconCheck className="w-5 h-5 text-white" stroke={1.5} />
                <span className="text-sm font-semibold text-white">
                  {saving ? 'Saving...' : 'Save Changes'}
                </span>
              </button>
            )}
          </div>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-[14px] p-8 shadow-[0_4px_12px_rgba(0,0,0,0.05)] border border-[#0D7C8C]/20">
          {/* User Info */}
          <div className="flex items-center gap-4 mb-8 pb-8 border-b border-[#E5E7EB]">
            <div className="w-16 h-16 bg-[#0D7C8C] rounded-full flex items-center justify-center">
              <IconUser className="w-8 h-8 text-[#2D3748]" stroke={1.5} />
            </div>
            <div>
              <h2 className="text-[20px] font-bold text-[#2D3748]">{user?.email}</h2>
              <p className="text-[14px] text-[#718096]">Member since {new Date(user?.created_at).toLocaleDateString()}</p>
            </div>
          </div>

          {/* Investment Preferences */}
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[18px] font-bold text-[#2D3748]">
                {userType === 'individual' ? 'Investment Preferences' : 'Institutional Profile'}
              </h3>
              <span className="px-3 py-1 bg-[#0D7C8C] rounded-full text-xs font-semibold text-[#2D3748]">
                {userType === 'individual' ? 'Individual Investor' : 'Institutional User'}
              </span>
            </div>

            {/* Individual Investor Fields */}
            {userType === 'individual' && (
              <>
                {/* Experience Level */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <IconTrendingUp className="w-5 h-5 text-[#2E4D8E]" stroke={1.5} />
                    <label className="text-[14px] font-semibold text-[#2D3748]">
                      Experience Level
                    </label>
                  </div>
                  {editing ? (
                    <select
                      value={profileData.experience}
                      onChange={(e) => setProfileData({ ...profileData, experience: e.target.value })}
                      className="w-full p-3 bg-[#F8F9FB] border border-[#0D7C8C]/30 rounded-lg text-[#2D3748] focus:outline-none focus:ring-2 focus:ring-[#2E4D8E]"
                    >
                      <option value="">Select experience level</option>
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                      <option value="Professional">Professional</option>
                    </select>
                  ) : (
                    <div className="p-3 bg-[#F8F9FB] rounded-lg text-[#2D3748]">
                      {profileData.experience || 'Not set'}
                    </div>
                  )}
                </div>

                {/* Investment Goal */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <IconTarget className="w-5 h-5 text-[#2E4D8E]" stroke={1.5} />
                    <label className="text-[14px] font-semibold text-[#2D3748]">
                      Investment Goal
                    </label>
                  </div>
                  {editing ? (
                    <select
                      value={profileData.investment_goal}
                      onChange={(e) => setProfileData({ ...profileData, investment_goal: e.target.value })}
                      className="w-full p-3 bg-[#F8F9FB] border border-[#0D7C8C]/30 rounded-lg text-[#2D3748] focus:outline-none focus:ring-2 focus:ring-[#2E4D8E]"
                    >
                      <option value="">Select investment goal</option>
                      <option value="Wealth Growth">Wealth Growth</option>
                      <option value="Income Generation">Income Generation</option>
                      <option value="Capital Preservation">Capital Preservation</option>
                      <option value="Retirement Planning">Retirement Planning</option>
                    </select>
                  ) : (
                    <div className="p-3 bg-[#F8F9FB] rounded-lg text-[#2D3748]">
                      {profileData.investment_goal || 'Not set'}
                    </div>
                  )}
                </div>

                {/* Risk Tolerance */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <IconShield className="w-5 h-5 text-[#2E4D8E]" stroke={1.5} />
                    <label className="text-[14px] font-semibold text-[#2D3748]">
                      Risk Tolerance
                    </label>
                  </div>
                  {editing ? (
                    <select
                      value={profileData.risk_tolerance}
                      onChange={(e) => setProfileData({ ...profileData, risk_tolerance: e.target.value })}
                      className="w-full p-3 bg-[#F8F9FB] border border-[#0D7C8C]/30 rounded-lg text-[#2D3748] focus:outline-none focus:ring-2 focus:ring-[#2E4D8E]"
                    >
                      <option value="">Select risk tolerance</option>
                      <option value="Conservative">Conservative</option>
                      <option value="Moderate">Moderate</option>
                      <option value="Aggressive">Aggressive</option>
                      <option value="Very Aggressive">Very Aggressive</option>
                    </select>
                  ) : (
                    <div className="p-3 bg-[#F8F9FB] rounded-lg text-[#2D3748]">
                      {profileData.risk_tolerance || 'Not set'}
                    </div>
                  )}
                </div>

                {/* Investment Horizon */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <IconClock className="w-5 h-5 text-[#2E4D8E]" stroke={1.5} />
                    <label className="text-[14px] font-semibold text-[#2D3748]">
                      Investment Horizon
                    </label>
                  </div>
                  {editing ? (
                    <select
                      value={profileData.investment_horizon}
                      onChange={(e) => setProfileData({ ...profileData, investment_horizon: e.target.value })}
                      className="w-full p-3 bg-[#F8F9FB] border border-[#0D7C8C]/30 rounded-lg text-[#2D3748] focus:outline-none focus:ring-2 focus:ring-[#2E4D8E]"
                    >
                      <option value="">Select investment horizon</option>
                      <option value="Short-term (< 1 year)">Short-term (&lt; 1 year)</option>
                      <option value="Medium-term (1-5 years)">Medium-term (1-5 years)</option>
                      <option value="Long-term (5-10 years)">Long-term (5-10 years)</option>
                      <option value="Very Long-term (10+ years)">Very Long-term (10+ years)</option>
                    </select>
                  ) : (
                    <div className="p-3 bg-[#F8F9FB] rounded-lg text-[#2D3748]">
                      {profileData.investment_horizon || 'Not set'}
                    </div>
                  )}
                </div>
              </>
            )}

            {/* Institutional User Fields */}
            {userType === 'institutional' && (
              <>
                {/* Institution Type */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <IconShield className="w-5 h-5 text-[#2E4D8E]" stroke={1.5} />
                    <label className="text-[14px] font-semibold text-[#2D3748]">
                      Institution Type
                    </label>
                  </div>
                  {editing ? (
                    <select
                      value={profileData.institution_type}
                      onChange={(e) => setProfileData({ ...profileData, institution_type: e.target.value })}
                      className="w-full p-3 bg-[#F8F9FB] border border-[#0D7C8C]/30 rounded-lg text-[#2D3748] focus:outline-none focus:ring-2 focus:ring-[#2E4D8E]"
                    >
                      <option value="">Select institution type</option>
                      <option value="Wealth Manager">Wealth Manager</option>
                      <option value="Fund House">Fund House</option>
                      <option value="Research Firm">Research Firm</option>
                      <option value="Brokerage">Brokerage</option>
                      <option value="Family Office">Family Office</option>
                      <option value="Other">Other</option>
                    </select>
                  ) : (
                    <div className="p-3 bg-[#F8F9FB] rounded-lg text-[#2D3748]">
                      {profileData.institution_type || 'Not set'}
                    </div>
                  )}
                </div>

                {/* Primary Use Case */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <IconTarget className="w-5 h-5 text-[#2E4D8E]" stroke={1.5} />
                    <label className="text-[14px] font-semibold text-[#2D3748]">
                      Primary Use Case
                    </label>
                  </div>
                  {editing ? (
                    <select
                      value={profileData.primary_use_case}
                      onChange={(e) => setProfileData({ ...profileData, primary_use_case: e.target.value })}
                      className="w-full p-3 bg-[#F8F9FB] border border-[#0D7C8C]/30 rounded-lg text-[#2D3748] focus:outline-none focus:ring-2 focus:ring-[#2E4D8E]"
                    >
                      <option value="">Select primary use case</option>
                      <option value="Client Portfolio Management">Client Portfolio Management</option>
                      <option value="Research & Analysis">Research & Analysis</option>
                      <option value="Fund Management">Fund Management</option>
                      <option value="Trading & Execution">Trading & Execution</option>
                    </select>
                  ) : (
                    <div className="p-3 bg-[#F8F9FB] rounded-lg text-[#2D3748]">
                      {profileData.primary_use_case || 'Not set'}
                    </div>
                  )}
                </div>

                {/* Assets Under Management */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <IconTrendingUp className="w-5 h-5 text-[#2E4D8E]" stroke={1.5} />
                    <label className="text-[14px] font-semibold text-[#2D3748]">
                      Assets Under Management
                    </label>
                  </div>
                  {editing ? (
                    <select
                      value={profileData.assets_under_management}
                      onChange={(e) => setProfileData({ ...profileData, assets_under_management: e.target.value })}
                      className="w-full p-3 bg-[#F8F9FB] border border-[#0D7C8C]/30 rounded-lg text-[#2D3748] focus:outline-none focus:ring-2 focus:ring-[#2E4D8E]"
                    >
                      <option value="">Select AUM range</option>
                      <option value="< ₹10 Cr">&lt; ₹10 Cr</option>
                      <option value="₹10-100 Cr">₹10-100 Cr</option>
                      <option value="₹100-1000 Cr">₹100-1000 Cr</option>
                      <option value="₹1000+ Cr">₹1000+ Cr</option>
                    </select>
                  ) : (
                    <div className="p-3 bg-[#F8F9FB] rounded-lg text-[#2D3748]">
                      {profileData.assets_under_management || 'Not set'}
                    </div>
                  )}
                </div>

                {/* Team Size */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <IconUser className="w-5 h-5 text-[#2E4D8E]" stroke={1.5} />
                    <label className="text-[14px] font-semibold text-[#2D3748]">
                      Team Size
                    </label>
                  </div>
                  {editing ? (
                    <select
                      value={profileData.team_size}
                      onChange={(e) => setProfileData({ ...profileData, team_size: e.target.value })}
                      className="w-full p-3 bg-[#F8F9FB] border border-[#0D7C8C]/30 rounded-lg text-[#2D3748] focus:outline-none focus:ring-2 focus:ring-[#2E4D8E]"
                    >
                      <option value="">Select team size</option>
                      <option value="Solo">Solo</option>
                      <option value="2-10 members">2-10 members</option>
                      <option value="10-50 members">10-50 members</option>
                      <option value="50+ members">50+ members</option>
                    </select>
                  ) : (
                    <div className="p-3 bg-[#F8F9FB] rounded-lg text-[#2D3748]">
                      {profileData.team_size || 'Not set'}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
