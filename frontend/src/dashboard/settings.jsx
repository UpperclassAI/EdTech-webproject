// Settings.jsx
import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
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
  FiPlus,
  FiChevronDown,
  FiChevronUp,
  FiEdit2,
  FiCheck
} from "react-icons/fi";

export default function Settings() {
  const { theme, toggleTheme } = useTheme();
  const [expandedSection, setExpandedSection] = useState(null);
  const [email, setEmail] = useState("peter.josh@example.com");
  const [username, setUsername] = useState("Peter Josh");
  const [language, setLanguage] = useState("English");
  const [themeMode, setThemeMode] = useState(theme);
  const [privacy, setPrivacy] = useState("Public");
  const [paymentPlan, setPaymentPlan] = useState("Pro Plan");
  const [reminderEnabled, setReminderEnabled] = useState(true);
  const [certificateEnabled, setCertificateEnabled] = useState(true);
  const [autoUpdate, setAutoUpdate] = useState(true);
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false
  });

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const handleSave = () => {
    // Save settings logic here
    console.log("Settings saved");
  };

  const sections = [
    {
      id: "account",
      title: "Account",
      icon: <FiUser />,
      items: [
        {
          label: "Email",
          icon: <FiMail />,
          value: email,
          editable: true,
          type: "email",
          action: () => {
            const newEmail = prompt("Enter new email:", email);
            if (newEmail) setEmail(newEmail);
          }
        },
        {
          label: "Username",
          icon: <FiUser />,
          value: username,
          editable: true,
          type: "text",
          action: () => {
            const newUsername = prompt("Enter new username:", username);
            if (newUsername) setUsername(newUsername);
          }
        },
        {
          label: "Language",
          icon: <FiGlobe />,
          value: language,
          editable: true,
          type: "select",
          options: ["English", "Spanish", "French", "German", "Chinese"],
          action: () => {
            const newLang = prompt("Enter language:", language);
            if (newLang) setLanguage(newLang);
          }
        },
        {
          label: "Theme",
          icon: <FiMoon />,
          value: themeMode,
          editable: true,
          type: "select",
          options: ["light", "dark"],
          action: () => {
            toggleTheme();
            setThemeMode(themeMode === "light" ? "dark" : "light");
          }
        },
        {
          label: "Privacy",
          icon: <FiLock />,
          value: privacy,
          editable: true,
          type: "select",
          options: ["Public", "Private", "Friends Only"],
          action: () => {
            const newPrivacy = prompt("Set privacy:", privacy);
            if (newPrivacy) setPrivacy(newPrivacy);
          }
        }
      ]
    },
    {
      id: "payment",
      title: "Payment Plan",
      icon: <FiCreditCard />,
      items: [
        {
          label: "Current Plan",
          value: paymentPlan,
          editable: true,
          type: "select",
          options: ["Free Plan", "Basic Plan", "Pro Plan", "Enterprise"],
          action: () => {
            const newPlan = prompt("Select plan:", paymentPlan);
            if (newPlan) setPaymentPlan(newPlan);
          }
        }
      ]
    },
    {
      id: "reminder",
      title: "Reminder",
      icon: <FiClock />,
      items: [
        {
          label: "Enabled",
          value: reminderEnabled ? "Yes" : "No",
          type: "toggle",
          action: () => setReminderEnabled(!reminderEnabled)
        }
      ]
    },
    {
      id: "certificate",
      title: "Certificate",
      icon: <FiAward />,
      items: [
        {
          label: "Auto-generate",
          value: certificateEnabled ? "Yes" : "No",
          type: "toggle",
          action: () => setCertificateEnabled(!certificateEnabled)
        }
      ]
    },
    {
      id: "update",
      title: "Auto Update",
      icon: <FiRefreshCw />,
      items: [
        {
          label: "Enabled",
          value: autoUpdate ? "Yes" : "No",
          type: "toggle",
          action: () => setAutoUpdate(!autoUpdate)
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
          value: notifications.email ? "Enabled" : "Disabled",
          type: "toggle",
          action: () => setNotifications({...notifications, email: !notifications.email})
        },
        {
          label: "Push Notifications",
          value: notifications.push ? "Enabled" : "Disabled",
          type: "toggle",
          action: () => setNotifications({...notifications, push: !notifications.push})
        },
        {
          label: "SMS Notifications",
          value: notifications.sms ? "Enabled" : "Disabled",
          type: "toggle",
          action: () => setNotifications({...notifications, sms: !notifications.sms})
        }
      ]
    },
    {
      id: "add",
      title: "Add Account",
      icon: <FiPlus />,
      items: [
        {
          label: "Add New Account",
          value: "",
          type: "button",
          action: () => {
            alert("Add account functionality would open here");
          }
        }
      ]
    }
  ];

  return (
    <div className={`flex-1 transition-all duration-300 ${
      theme === "dark" ? "text-gray-100" : "text-gray-800"
    }`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">Settings</h1>
          <p className={`mt-2 ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
            Manage your account settings and preferences
          </p>
        </div>
        <button
          onClick={handleSave}
          className={`px-4 py-2 rounded-lg font-medium flex items-center gap-2 ${
            theme === "dark" 
              ? "bg-blue-600 hover:bg-blue-700 text-white" 
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
        >
          <FiCheck /> Save Changes
        </button>
      </div>

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
                    className={`flex items-center justify-between py-3 ${
                      index !== section.items.length - 1 ? `border-b ${theme === "dark" ? "border-gray-700/50" : "border-gray-200"}` : ''
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {item.icon && (
                        <div className={`p-1.5 rounded-md ${
                          theme === "dark" ? "text-gray-400" : "text-gray-500"
                        }`}>
                          {item.icon}
                        </div>
                      )}
                      <div>
                        <p className="font-medium">{item.label}</p>
                        {item.value && (
                          <p className={`text-sm ${
                            theme === "dark" ? "text-gray-400" : "text-gray-500"
                          }`}>
                            {item.value}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      {item.type === "toggle" ? (
                        <button
                          onClick={item.action}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                            (item.value === "Yes" || item.value === "Enabled")
                              ? theme === "dark" ? "bg-blue-600" : "bg-blue-500"
                              : theme === "dark" ? "bg-gray-700" : "bg-gray-300"
                          }`}
                        >
                          <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                            (item.value === "Yes" || item.value === "Enabled") ? 'translate-x-6' : 'translate-x-1'
                          }`} />
                        </button>
                      ) : item.type === "button" ? (
                        <button
                          onClick={item.action}
                          className={`px-4 py-2 rounded-lg font-medium ${
                            theme === "dark" 
                              ? "bg-blue-600 hover:bg-blue-700 text-white" 
                              : "bg-blue-500 hover:bg-blue-600 text-white"
                          }`}
                        >
                          {item.label}
                        </button>
                      ) : item.editable ? (
                        <button
                          onClick={item.action}
                          className={`p-2 rounded-lg flex items-center gap-1 ${
                            theme === "dark" 
                              ? "bg-gray-700 hover:bg-gray-600 text-gray-300" 
                              : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                          }`}
                        >
                          <FiEdit2 /> Edit
                        </button>
                      ) : (
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          theme === "dark" 
                            ? "bg-gray-700 text-gray-300" 
                            : "bg-gray-100 text-gray-700"
                        }`}>
                          {item.value}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Quick Stats */}
      <div className={`mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 ${
        theme === "dark" ? "text-gray-100" : "text-gray-800"
      }`}>
        <div className={`p-4 rounded-xl ${
          theme === "dark" ? "bg-gray-800/50" : "bg-white/50"
        } backdrop-blur-sm border ${
          theme === "dark" ? "border-gray-700" : "border-gray-200"
        }`}>
          <h3 className="font-semibold mb-2">Settings Summary</h3>
          <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
            {sections.length} categories configured
          </p>
          <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
            {sections.reduce((acc, section) => acc + section.items.length, 0)} total settings
          </p>
        </div>
        
        <div className={`p-4 rounded-xl ${
          theme === "dark" ? "bg-gray-800/50" : "bg-white/50"
        } backdrop-blur-sm border ${
          theme === "dark" ? "border-gray-700" : "border-gray-200"
        }`}>
          <h3 className="font-semibold mb-2">Active Features</h3>
          <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
            {reminderEnabled ? "✓" : "✗"} Reminders
          </p>
          <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
            {certificateEnabled ? "✓" : "✗"} Auto-certificate
          </p>
          <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
            {autoUpdate ? "✓" : "✗"} Auto-update
          </p>
        </div>
        
        <div className={`p-4 rounded-xl ${
          theme === "dark" ? "bg-gray-800/50" : "bg-white/50"
        } backdrop-blur-sm border ${
          theme === "dark" ? "border-gray-700" : "border-gray-200"
        }`}>
          <h3 className="font-semibold mb-2">Notifications</h3>
          <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
            {notifications.email ? "✓" : "✗"} Email
          </p>
          <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
            {notifications.push ? "✓" : "✗"} Push
          </p>
          <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
            {notifications.sms ? "✓" : "✗"} SMS
          </p>
        </div>
      </div>

      <div className={`mt-6 text-sm ${
        theme === "dark" ? "text-gray-400" : "text-gray-600"
      }`}>
        <p>Click on any section above to expand and view/edit its settings.</p>
      </div>
    </div>
  );
}