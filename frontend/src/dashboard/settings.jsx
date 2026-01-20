// dashboard/settings.jsx - Updated with Image Upload and LMS Account
import { useState, useRef } from "react";
import { useTheme } from "../context/ThemeContext";
import { useSettings } from "../context/SettingsContext";
import {
  FiMail,
  FiUser,
  FiGlobe,
  FiMoon,
  FiLock,
  FiCreditCard,
  FiClock,
  FiAward,
  FiRefreshCw,
  FiBell,
  FiChevronDown,
  FiChevronUp,
  FiEdit2,
  FiCheck,
  FiSave,
  FiTarget,
  FiShield,
  FiDownload,
  FiUpload,
  FiImage,
  FiTrash2,
  FiExternalLink,
  FiLink,
  FiUnlock,
  FiBookOpen,
  FiPlus
} from "react-icons/fi";

export default function Settings() {
  const { theme, toggleTheme } = useTheme();
  const { settings, updateSetting, resetSettings, exportSettings, isDirty, saveSettings } = useSettings();
  
  const [expandedSection, setExpandedSection] = useState("account");
  const [saving, setSaving] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [lmsAccounts, setLmsAccounts] = useState([
    { id: 1, platform: "Canvas", connected: true, email: "peter@school.edu" },
    { id: 2, platform: "Moodle", connected: false, email: "" },
    { id: 3, platform: "Google Classroom", connected: true, email: "peter.josh@gmail.com" },
    { id: 4, platform: "Blackboard", connected: false, email: "" }
  ]);
  
  const fileInputRef = useRef(null);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const handleSave = async () => {
    setSaving(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    saveSettings();
    setSaving(false);
  };

  const handleFileImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const imported = JSON.parse(event.target.result);
          Object.keys(imported).forEach(key => {
            updateSetting(key, imported[key]);
          });
          alert('Settings imported successfully!');
        } catch (error) {
          alert('Failed to import settings. Invalid file format.');
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert("Image size should be less than 5MB");
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfileImage(event.target.result);
        updateSetting("profileImage", event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeProfileImage = () => {
    setProfileImage(null);
    updateSetting("profileImage", null);
  };

  const triggerImageUpload = () => {
    fileInputRef.current.click();
  };

  const toggleLMSAccount = (id) => {
    setLmsAccounts(lmsAccounts.map(account => 
      account.id === id 
        ? { ...account, connected: !account.connected }
        : account
    ));
  };

  const addNewLMSAccount = () => {
    const platform = prompt("Enter LMS platform name:");
    if (platform) {
      const email = prompt("Enter your email for this platform:");
      const newAccount = {
        id: lmsAccounts.length + 1,
        platform,
        connected: true,
        email: email || ""
      };
      setLmsAccounts([...lmsAccounts, newAccount]);
    }
  };

  const removeLMSAccount = (id) => {
    if (window.confirm("Are you sure you want to remove this LMS account?")) {
      setLmsAccounts(lmsAccounts.filter(account => account.id !== id));
    }
  };

  const profileColorOptions = [
    { value: "from-blue-500 to-blue-700", label: "Blue Gradient", color: "bg-gradient-to-r from-blue-500 to-blue-700" },
    { value: "from-purple-500 to-pink-500", label: "Purple-Pink", color: "bg-gradient-to-r from-purple-500 to-pink-500" },
    { value: "from-green-500 to-teal-500", label: "Green-Teal", color: "bg-gradient-to-r from-green-500 to-teal-500" },
    { value: "from-orange-500 to-red-500", label: "Orange-Red", color: "bg-gradient-to-r from-orange-500 to-red-500" },
    { value: "from-indigo-500 to-purple-500", label: "Indigo-Purple", color: "bg-gradient-to-r from-indigo-500 to-purple-500" }
  ];

  const sections = [
    {
      id: "account",
      title: "Account & Profile",
      icon: <FiUser />,
      items: [
        {
          label: "Profile Image",
          type: "image",
          description: "Upload your profile picture",
          action: triggerImageUpload
        },
        {
          label: "Profile Color",
          value: settings.profileColor || "from-blue-500 to-blue-700",
          type: "color-select",
          options: profileColorOptions,
          description: "Avatar background color",
          action: (value) => updateSetting("profileColor", value)
        },
        {
          label: "Email",
          value: settings.email,
          editable: true,
          action: () => {
            const newEmail = prompt("Enter new email:", settings.email);
            if (newEmail) updateSetting("email", newEmail);
          }
        },
        {
          label: "Display Name",
          value: settings.displayName,
          editable: true,
          description: "Name shown in dashboard",
          action: () => {
            const newName = prompt("Enter display name:", settings.displayName);
            if (newName) updateSetting("displayName", newName);
          }
        },
        {
          label: "Profile Initials",
          value: settings.profileInitials,
          editable: true,
          description: "Shown in your profile avatar (max 2 chars)",
          action: () => {
            const newInitials = prompt("Enter profile initials:", settings.profileInitials);
            if (newInitials && newInitials.length <= 2) {
              updateSetting("profileInitials", newInitials);
            }
          }
        },
        {
          label: "User Role",
          value: settings.userRole || "Student",
          editable: true,
          type: "select",
          options: ["Student", "Instructor", "Admin", "Parent", "Guest"],
          action: (value) => updateSetting("userRole", value)
        },
        {
          label: "Language",
          value: settings.language,
          editable: true,
          type: "select",
          options: ["English", "Spanish", "French", "German", "Chinese", "Japanese"],
          action: (value) => updateSetting("language", value)
        },
        {
          label: "Theme",
          value: theme === "dark" ? "Dark" : "Light",
          type: "toggle",
          description: "Toggle dark/light mode",
          action: toggleTheme
        },
        {
          label: "Privacy",
          value: settings.privacy,
          editable: true,
          type: "select",
          options: ["Public", "Private", "Friends Only"],
          action: (value) => updateSetting("privacy", value)
        }
      ]
    },
    {
      id: "lms",
      title: "LMS Accounts",
      icon: <FiBookOpen />,
      items: [
        {
          label: "Connected Accounts",
          type: "lms-list",
          description: "Link your Learning Management Systems",
          accounts: lmsAccounts
        }
      ]
    },
    {
      id: "study",
      title: "Study Settings",
      icon: <FiTarget />,
      items: [
        {
          label: "Daily Study Goal",
          value: `${settings.studyGoals?.daily || 2} hours`,
          editable: true,
          type: "number",
          description: "Daily target study hours",
          action: () => {
            const newGoal = prompt("Enter daily goal (hours):", settings.studyGoals?.daily || 2);
            if (newGoal && !isNaN(newGoal)) {
              updateSetting("studyGoals.daily", parseFloat(newGoal));
            }
          }
        },
        {
          label: "Weekly Study Goal",
          value: `${settings.studyGoals?.weekly || 14} hours`,
          editable: true,
          description: "Weekly target study hours",
          action: () => {
            const newGoal = prompt("Enter weekly goal (hours):", settings.studyGoals?.weekly || 14);
            if (newGoal && !isNaN(newGoal)) {
              updateSetting("studyGoals.weekly", parseFloat(newGoal));
            }
          }
        },
        {
          label: "Study Reminders",
          value: settings.reminderEnabled ? "Enabled" : "Disabled",
          type: "toggle",
          description: "Daily study reminders",
          action: () => updateSetting("reminderEnabled", !settings.reminderEnabled)
        },
        {
          label: "Notification Time",
          value: settings.studyGoals?.notificationTime || "09:00",
          editable: true,
          description: "Time for daily reminders",
          action: () => {
            const newTime = prompt("Enter notification time (HH:MM):", settings.studyGoals?.notificationTime || "09:00");
            if (newTime) updateSetting("studyGoals.notificationTime", newTime);
          }
        }
      ]
    },
    {
      id: "notifications",
      title: "Notifications",
      icon: <FiBell />,
      items: [
        {
          label: "Email Notifications",
          value: settings.notifications?.email ? "Enabled" : "Disabled",
          type: "toggle",
          action: () => updateSetting("notifications.email", !settings.notifications?.email)
        },
        {
          label: "Push Notifications",
          value: settings.notifications?.push ? "Enabled" : "Disabled",
          type: "toggle",
          action: () => updateSetting("notifications.push", !settings.notifications?.push)
        },
        {
          label: "SMS Notifications",
          value: settings.notifications?.sms ? "Enabled" : "Disabled",
          type: "toggle",
          action: () => updateSetting("notifications.sms", !settings.notifications?.sms)
        },
        {
          label: "Course Updates",
          value: settings.notifications?.courseUpdates ? "Enabled" : "Disabled",
          type: "toggle",
          action: () => updateSetting("notifications.courseUpdates", !settings.notifications?.courseUpdates)
        }
      ]
    },
    {
      id: "features",
      title: "Features",
      icon: <FiAward />,
      items: [
        {
          label: "Auto-generate Certificates",
          value: settings.certificateEnabled ? "Enabled" : "Disabled",
          type: "toggle",
          description: "Automatically generate course certificates",
          action: () => updateSetting("certificateEnabled", !settings.certificateEnabled)
        },
        {
          label: "Auto Update Content",
          value: settings.autoUpdate ? "Enabled" : "Disabled",
          type: "toggle",
          description: "Automatically update course materials",
          action: () => updateSetting("autoUpdate", !settings.autoUpdate)
        },
        {
          label: "Show Badges",
          value: settings.showBadges ? "Enabled" : "Disabled",
          type: "toggle",
          description: "Display achievement badges",
          action: () => updateSetting("showBadges", !settings.showBadges)
        },
        {
          label: "Show Streak",
          value: settings.showStreak ? "Enabled" : "Disabled",
          type: "toggle",
          description: "Display daily study streak",
          action: () => updateSetting("showStreak", !settings.showStreak)
        }
      ]
    },
    {
      id: "data",
      title: "Data Management",
      icon: <FiShield />,
      items: [
        {
          label: "Export Settings",
          value: "Download backup",
          type: "button",
          action: exportSettings
        },
        {
          label: "Import Settings",
          value: "Upload backup",
          type: "button",
          action: handleFileImport
        },
        {
          label: "Reset All Settings",
          value: "Restore defaults",
          type: "button",
          action: () => {
            if (window.confirm("Are you sure you want to reset all settings to default?")) {
              resetSettings();
            }
          }
        }
      ]
    }
  ];

  const renderItemContent = (item) => {
    switch (item.type) {
      case "image":
        return (
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-sm">{item.label}</p>
              <p className={`text-xs mt-0.5 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                {item.description}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {profileImage || settings.profileImage ? (
                <>
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-blue-500">
                    <img 
                      src={profileImage || settings.profileImage} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button
                    onClick={removeProfileImage}
                    className={`p-2 rounded-full ${
                      theme === "dark" 
                        ? "bg-red-900/30 hover:bg-red-800 text-red-300" 
                        : "bg-red-100 hover:bg-red-200 text-red-600"
                    }`}
                  >
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <button
                  onClick={triggerImageUpload}
                  className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 ${
                    theme === "dark" 
                      ? "bg-blue-600 hover:bg-blue-700 text-white" 
                      : "bg-blue-500 hover:bg-blue-600 text-white"
                  }`}
                >
                  <FiImage /> Upload
                </button>
              )}
            </div>
          </div>
        );

      case "color-select":
        return (
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-sm">{item.label}</p>
              <p className={`text-xs mt-0.5 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                {item.description}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <select
                value={item.value}
                onChange={(e) => item.action(e.target.value)}
                className={`text-sm px-3 py-1.5 rounded-lg border ${
                  theme === "dark"
                    ? "bg-gray-700 border-gray-600 text-gray-200"
                    : "bg-white border-gray-300 text-gray-800"
                }`}
              >
                {item.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <div className={`w-6 h-6 rounded-full ${item.value}`}></div>
            </div>
          </div>
        );

      case "lms-list":
        return (
          <div>
            <div className="flex justify-between items-center mb-3">
              <div>
                <p className="font-medium text-sm">{item.label}</p>
                <p className={`text-xs mt-0.5 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                  {item.description}
                </p>
              </div>
              <button
                onClick={addNewLMSAccount}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-2 text-sm ${
                  theme === "dark" 
                    ? "bg-blue-600 hover:bg-blue-700 text-white" 
                    : "bg-blue-500 hover:bg-blue-600 text-white"
                }`}
              >
                <FiPlus /> Add Account
              </button>
            </div>
            
            <div className="space-y-3">
              {item.accounts.map((account) => (
                <div 
                  key={account.id}
                  className={`p-3 rounded-lg border ${
                    theme === "dark" 
                      ? "bg-gray-800 border-gray-700" 
                      : "bg-gray-50 border-gray-200"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        account.connected
                          ? theme === "dark" ? "bg-green-900/30 text-green-300" : "bg-green-100 text-green-600"
                          : theme === "dark" ? "bg-gray-700 text-gray-400" : "bg-gray-100 text-gray-500"
                      }`}>
                        {account.connected ? <FiLink /> : <FiUnlock />}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{account.platform}</p>
                        {account.email && (
                          <p className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                            {account.email}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleLMSAccount(account.id)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                          account.connected
                            ? theme === "dark" ? "bg-green-600" : "bg-green-500"
                            : theme === "dark" ? "bg-gray-700" : "bg-gray-300"
                        }`}
                      >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                          account.connected ? 'translate-x-6' : 'translate-x-1'
                        }`} />
                      </button>
                      <button
                        onClick={() => removeLMSAccount(account.id)}
                        className={`p-1.5 rounded-lg ${
                          theme === "dark" 
                            ? "hover:bg-gray-700 text-gray-400" 
                            : "hover:bg-gray-200 text-gray-500"
                        }`}
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "toggle":
        return (
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-sm">{item.label}</p>
              {item.description && (
                <p className={`text-xs mt-0.5 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                  {item.description}
                </p>
              )}
            </div>
            <button
              onClick={item.action}
              className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                item.value === "Enabled"
                  ? theme === "dark" ? "bg-blue-600" : "bg-blue-500"
                  : theme === "dark" ? "bg-gray-700" : "bg-gray-300"
              }`}
            >
              <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                item.value === "Enabled" ? 'translate-x-6' : 'translate-x-1'
              }`} />
            </button>
          </div>
        );

      case "select":
        return (
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-sm">{item.label}</p>
              {item.description && (
                <p className={`text-xs mt-0.5 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                  {item.description}
                </p>
              )}
            </div>
            <select
              value={item.value}
              onChange={(e) => item.action(e.target.value)}
              className={`text-sm px-3 py-1.5 rounded-lg border ${
                theme === "dark"
                  ? "bg-gray-700 border-gray-600 text-gray-200"
                  : "bg-white border-gray-300 text-gray-800"
              }`}
            >
              {item.options.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        );

      case "button":
        return (
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-sm">{item.label}</p>
              {item.description && (
                <p className={`text-xs mt-0.5 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                  {item.description}
                </p>
              )}
            </div>
            <button
              onClick={item.action}
              className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 ${
                theme === "dark" 
                  ? "bg-blue-600 hover:bg-blue-700 text-white" 
                  : "bg-blue-500 hover:bg-blue-600 text-white"
              }`}
            >
              {item.value}
            </button>
          </div>
        );

      default:
        return (
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-sm">{item.label}</p>
              <p className={`text-sm mt-0.5 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                {item.value}
              </p>
              {item.description && (
                <p className={`text-xs mt-0.5 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                  {item.description}
                </p>
              )}
            </div>
            {item.editable && (
              <button
                onClick={item.action}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-1 text-sm ${
                  theme === "dark"
                    ? "bg-gray-700 hover:bg-gray-600 text-gray-300"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                }`}
              >
                <FiEdit2 className="w-3 h-3" /> Edit
              </button>
            )}
          </div>
        );
    }
  };

  return (
    <div className={`flex-1 transition-all duration-300 p-4 md:p-6 ${
      theme === "dark" ? "text-gray-100" : "text-gray-800"
    }`}>
      {/* Hidden file input for image upload */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageUpload}
        accept="image/*"
        className="hidden"
      />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Settings</h1>
          <p className={`mt-2 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
            Manage your account settings and preferences
          </p>
        </div>
        
        <div className="flex gap-3">
          {isDirty && (
            <div className={`px-3 py-1.5 rounded-lg text-sm ${
              theme === "dark" ? "bg-yellow-900/30 text-yellow-300" : "bg-yellow-100 text-yellow-700"
            }`}>
              Unsaved changes
            </div>
          )}
          <button
            onClick={handleSave}
            disabled={!isDirty || saving}
            className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-all ${
              isDirty
                ? theme === "dark" 
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-blue-500 hover:bg-blue-600 text-white"
                : theme === "dark"
                  ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            {saving ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Saving...
              </>
            ) : (
              <>
                <FiSave /> Save Changes
              </>
            )}
          </button>
        </div>
      </div>

      {/* Settings Sections */}
      <div className={`rounded-xl ${
        theme === "dark" ? "bg-gray-800/50" : "bg-white/50"
      } backdrop-blur-sm border ${
        theme === "dark" ? "border-gray-700" : "border-gray-200"
      } overflow-hidden`}>
        {sections.map((section) => (
          <div 
            key={section.id}
            className={`border-b ${
              theme === "dark" ? "border-gray-700" : "border-gray-200"
            }`}
          >
            <button
              onClick={() => toggleSection(section.id)}
              className={`w-full flex items-center justify-between p-4 text-left transition-colors ${
                theme === "dark" 
                  ? "hover:bg-gray-700/50" 
                  : "hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${
                  theme === "dark" 
                    ? "bg-blue-900/30 text-blue-400" 
                    : "bg-blue-100 text-blue-600"
                }`}>
                  {section.icon}
                </div>
                <div>
                  <h3 className="font-semibold">{section.title}</h3>
                  <p className={`text-sm ${
                    theme === "dark" ? "text-gray-400" : "text-gray-500"
                  }`}>
                    {section.items.length} setting{section.items.length !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>
              <div className={`p-1 rounded-full ${
                theme === "dark" ? "bg-gray-700" : "bg-gray-100"
              }`}>
                {expandedSection === section.id ? (
                  <FiChevronUp className="text-lg" />
                ) : (
                  <FiChevronDown className="text-lg" />
                )}
              </div>
            </button>

            {/* Expanded Content */}
            {expandedSection === section.id && (
              <div className={`px-4 pb-4 ${
                theme === "dark" ? "bg-gray-800/30" : "bg-gray-50/50"
              }`}>
                {section.items.map((item, index) => (
                  <div 
                    key={index}
                    className={`py-3 ${
                      index !== section.items.length - 1 ? `border-b ${theme === "dark" ? "border-gray-700/50" : "border-gray-200"}` : ''
                    }`}
                  >
                    {renderItemContent(item)}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Current Settings Summary */}
      <div className={`mt-8 p-6 rounded-xl ${
        theme === "dark" ? "bg-gray-800/30 border-gray-700" : "bg-blue-50/50 border-blue-200"
      } border`}>
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <FiCheck /> Current Settings Summary
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>Name</p>
            <p className="font-medium">{settings.displayName}</p>
          </div>
          <div>
            <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>Profile</p>
            <p className="font-medium">
              {settings.profileImage ? "Image Uploaded" : "Using Initials"}
            </p>
          </div>
          <div>
            <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>Connected LMS</p>
            <p className="font-medium">
              {lmsAccounts.filter(a => a.connected).length} accounts
            </p>
          </div>
          <div>
            <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>Study Goals</p>
            <p className="font-medium">{settings.studyGoals?.daily || 2}h daily, {settings.studyGoals?.weekly || 14}h weekly</p>
          </div>
          <div>
            <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>Theme</p>
            <p className="font-medium">{theme === "dark" ? "Dark" : "Light"} Mode</p>
          </div>
          <div>
            <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>Auto-certificates</p>
            <p className="font-medium">{settings.certificateEnabled ? "Enabled" : "Disabled"}</p>
          </div>
        </div>
      </div>

      <div className={`mt-6 text-sm ${
        theme === "dark" ? "text-gray-400" : "text-gray-600"
      }`}>
        <p>Settings are automatically saved to your browser. Changes will reflect across the dashboard.</p>
      </div>
    </div>
  );
}