// context/SettingsContext.jsx
import { createContext, useState, useContext, useEffect } from "react";

const SettingsContext = createContext();

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
};

export const SettingsProvider = ({ children }) => {
  // Load settings from localStorage
  const loadSettings = () => {
    try {
      const saved = localStorage.getItem("userSettings");
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (error) {
      console.error("Failed to load settings:", error);
    }
    
    // Default settings
    return {
      // Account
      email: "peter.josh@example.com",
      username: "Peter Josh",
      displayName: "Peter Josh",
      language: "English",
      privacy: "Public",
      
      // Subscription
      paymentPlan: "Pro Plan",
      
      // Features
      reminderEnabled: true,
      certificateEnabled: true,
      autoUpdate: true,
      
      // Notifications
      notifications: {
        email: true,
        push: true,
        sms: false,
        marketing: false
      },
      
      // Study Goals
      studyGoals: {
        daily: 2,
        weekly: 14,
        notificationTime: "09:00"
      },
      
      // Performance
      performance: {
        chartRange: "week",
        showGoals: true,
        showComparison: false
      },
      
      // Profile
      profileInitials: "PJ",
      profileColor: "from-blue-500 to-blue-700",
      showBadges: true,
      showStreak: true
    };
  };

  const [settings, setSettings] = useState(loadSettings());
  const [isDirty, setIsDirty] = useState(false);

  // Save settings to localStorage
  const saveSettings = (newSettings) => {
    try {
      localStorage.setItem("userSettings", JSON.stringify(newSettings));
      setIsDirty(false);
    } catch (error) {
      console.error("Failed to save settings:", error);
    }
  };

  // Update setting
  const updateSetting = (path, value) => {
    setSettings(prev => {
      // Handle nested paths (e.g., "notifications.email")
      const keys = path.split('.');
      const newSettings = { ...prev };
      let current = newSettings;
      
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]] || typeof current[keys[i]] !== 'object') {
          current[keys[i]] = {};
        }
        current[keys[i]] = { ...current[keys[i]] };
        current = current[keys[i]];
      }
      
      current[keys[keys.length - 1]] = value;
      return newSettings;
    });
    setIsDirty(true);
  };

  // Update multiple settings
  const updateSettings = (updates) => {
    setSettings(prev => ({ ...prev, ...updates }));
    setIsDirty(true);
  };

  // Reset to defaults
  const resetSettings = () => {
    const defaults = loadSettings();
    setSettings(defaults);
    saveSettings(defaults);
  };

  // Export settings
  const exportSettings = () => {
    const dataStr = JSON.stringify(settings, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `settings-backup-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  // Import settings
  const importSettings = (jsonString) => {
    try {
      const imported = JSON.parse(jsonString);
      setSettings(imported);
      saveSettings(imported);
      return { success: true };
    } catch (error) {
      console.error("Failed to import settings:", error);
      return { success: false, error: "Invalid JSON format" };
    }
  };

  // Auto-save when settings change
  useEffect(() => {
    if (isDirty) {
      const timeoutId = setTimeout(() => {
        saveSettings(settings);
      }, 1000); // Debounce 1 second
      
      return () => clearTimeout(timeoutId);
    }
  }, [settings, isDirty]);

  const value = {
    settings,
    updateSetting,
    updateSettings,
    resetSettings,
    exportSettings,
    importSettings,
    saveSettings: () => saveSettings(settings),
    isDirty
  };

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
};