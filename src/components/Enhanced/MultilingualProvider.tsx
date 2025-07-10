import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from '../Auth/AuthContext';

interface Translation {
  [key: string]: string | Translation;
}

interface MultilingualContextType {
  currentLanguage: string;
  setLanguage: (language: string) => void;
  t: (key: string) => string;
  languages: Array<{
    code: string;
    name: string;
    native: string;
  }>;
}

const MultilingualContext = createContext<MultilingualContextType | undefined>(undefined);

export const useMultilingual = () => {
  const context = useContext(MultilingualContext);
  if (context === undefined) {
    throw new Error('useMultilingual must be used within a MultilingualProvider');
  }
  return context;
};

const translations: Record<string, Translation> = {
  en: {
    common: {
      loading: 'Loading...',
      error: 'An error occurred',
      save: 'Save',
      cancel: 'Cancel',
      delete: 'Delete',
      edit: 'Edit',
      create: 'Create',
      search: 'Search',
      filter: 'Filter',
      export: 'Export',
      import: 'Import',
      settings: 'Settings',
      profile: 'Profile',
      logout: 'Logout',
      dashboard: 'Dashboard',
      back: 'Back',
      next: 'Next',
      previous: 'Previous',
      submit: 'Submit',
      close: 'Close'
    },
    navigation: {
      home: 'Home',
      contentGenerator: 'Content Generator',
      worksheetCreator: 'Worksheet Creator',
      knowledgeBase: 'Knowledge Base',
      visualAids: 'Visual Aids',
      lessonPlanner: 'Lesson Planner',
      audioAssessment: 'Audio Assessment',
      gamesGenerator: 'Games Generator'
    },
    dashboard: {
      title: 'Welcome to Sahayak',
      subtitle: 'Your AI-powered teaching companion',
      description: 'Designed specifically for multi-grade classrooms in India',
      quickActions: 'Quick Actions',
      allFeatures: 'All Features',
      stats: {
        studentsHelped: 'Students Helped',
        contentCreated: 'Content Created',
        timeSaved: 'Time Saved',
        teacherRating: 'Teacher Rating'
      }
    },
    voice: {
      listening: 'Listening...',
      speaking: 'Speaking...',
      ready: 'Ready',
      startListening: 'Start voice command',
      stopListening: 'Stop listening',
      voiceCommands: 'Voice Commands',
      currentLanguage: 'Current Language',
      testVoice: 'Test Voice',
      speechRate: 'Speech Rate',
      volume: 'Volume'
    }
  },
  hi: {
    common: {
      loading: 'लोड हो रहा है...',
      error: 'एक त्रुटि हुई',
      save: 'सेव करें',
      cancel: 'रद्द करें',
      delete: 'हटाएं',
      edit: 'संपादित करें',
      create: 'बनाएं',
      search: 'खोजें',
      filter: 'फिल्टर',
      export: 'निर्यात',
      import: 'आयात',
      settings: 'सेटिंग्स',
      profile: 'प्रोफाइल',
      logout: 'लॉगआउट',
      dashboard: 'डैशबोर्ड',
      back: 'वापस',
      next: 'अगला',
      previous: 'पिछला',
      submit: 'जमा करें',
      close: 'बंद करें'
    },
    navigation: {
      home: 'होम',
      contentGenerator: 'सामग्री जेनरेटर',
      worksheetCreator: 'वर्कशीट निर्माता',
      knowledgeBase: 'ज्ञान आधार',
      visualAids: 'दृश्य सहायता',
      lessonPlanner: 'पाठ योजनाकार',
      audioAssessment: 'ऑडियो मूल्यांकन',
      gamesGenerator: 'खेल जेनरेटर'
    },
    dashboard: {
      title: 'सहायक में आपका स्वागत है',
      subtitle: 'आपका AI-संचालित शिक्षण साथी',
      description: 'भारत में बहु-ग्रेड कक्षाओं के लिए विशेष रूप से डिज़ाइन किया गया',
      quickActions: 'त्वरित क्रियाएं',
      allFeatures: 'सभी सुविधाएं',
      stats: {
        studentsHelped: 'छात्रों की मदद की',
        contentCreated: 'सामग्री बनाई',
        timeSaved: 'समय बचाया',
        teacherRating: 'शिक्षक रेटिंग'
      }
    },
    voice: {
      listening: 'सुन रहा है...',
      speaking: 'बोल रहा है...',
      ready: 'तैयार',
      startListening: 'आवाज़ कमांड शुरू करें',
      stopListening: 'सुनना बंद करें',
      voiceCommands: 'आवाज़ कमांड',
      currentLanguage: 'वर्तमान भाषा',
      testVoice: 'आवाज़ परीक्षण',
      speechRate: 'बोलने की गति',
      volume: 'आवाज़'
    }
  },
  mr: {
    common: {
      loading: 'लोड होत आहे...',
      error: 'एक त्रुटी झाली',
      save: 'सेव्ह करा',
      cancel: 'रद्द करा',
      delete: 'हटवा',
      edit: 'संपादित करा',
      create: 'तयार करा',
      search: 'शोधा',
      filter: 'फिल्टर',
      export: 'निर्यात',
      import: 'आयात',
      settings: 'सेटिंग्ज',
      profile: 'प्रोफाइल',
      logout: 'लॉगआउट',
      dashboard: 'डॅशबोर्ड',
      back: 'मागे',
      next: 'पुढे',
      previous: 'मागील',
      submit: 'सबमिट करा',
      close: 'बंद करा'
    },
    navigation: {
      home: 'होम',
      contentGenerator: 'सामग्री जनरेटर',
      worksheetCreator: 'वर्कशीट निर्माता',
      knowledgeBase: 'ज्ञान आधार',
      visualAids: 'दृश्य साहाय्य',
      lessonPlanner: 'धडा नियोजक',
      audioAssessment: 'ऑडिओ मूल्यांकन',
      gamesGenerator: 'खेळ जनरेटर'
    },
    dashboard: {
      title: 'सहायकमध्ये आपले स्वागत',
      subtitle: 'तुमचा AI-चालित शिक्षण साथी',
      description: 'भारतातील बहु-श्रेणी वर्गखोल्यांसाठी विशेषतः डिझाइन केलेले',
      quickActions: 'द्रुत क्रिया',
      allFeatures: 'सर्व वैशिष्ट्ये',
      stats: {
        studentsHelped: 'विद्यार्थ्यांना मदत केली',
        contentCreated: 'सामग्री तयार केली',
        timeSaved: 'वेळ वाचवला',
        teacherRating: 'शिक्षक रेटिंग'
      }
    },
    voice: {
      listening: 'ऐकत आहे...',
      speaking: 'बोलत आहे...',
      ready: 'तयार',
      startListening: 'आवाज कमांड सुरू करा',
      stopListening: 'ऐकणे थांबवा',
      voiceCommands: 'आवाज कमांड',
      currentLanguage: 'सध्याची भाषा',
      testVoice: 'आवाज चाचणी',
      speechRate: 'बोलण्याचा वेग',
      volume: 'आवाज'
    }
  },
  ta: {
    common: {
      loading: 'ஏற்றுகிறது...',
      error: 'ஒரு பிழை ஏற்பட்டது',
      save: 'சேமி',
      cancel: 'ரத்து செய்',
      delete: 'நீக்கு',
      edit: 'திருத்து',
      create: 'உருவாக்கு',
      search: 'தேடு',
      filter: 'வடிகட்டு',
      export: 'ஏற்றுமதி',
      import: 'இறக்குமதி',
      settings: 'அமைப்புகள்',
      profile: 'சுயவிவரம்',
      logout: 'வெளியேறு',
      dashboard: 'டாஷ்போர்டு',
      back: 'பின்',
      next: 'அடுத்து',
      previous: 'முந்தைய',
      submit: 'சமர்ப்பி',
      close: 'மூடு'
    },
    navigation: {
      home: 'முகப்பு',
      contentGenerator: 'உள்ளடக்க ஜெனரேட்டர்',
      worksheetCreator: 'பணித்தாள் உருவாக்குபவர்',
      knowledgeBase: 'அறிவுத் தளம்',
      visualAids: 'காட்சி உதவிகள்',
      lessonPlanner: 'பாட திட்டமிடுபவர்',
      audioAssessment: 'ஆடியோ மதிப்பீடு',
      gamesGenerator: 'விளையாட்டு ஜெனரேட்டர்'
    },
    dashboard: {
      title: 'சஹாயக்கில் உங்களை வரவேற்கிறோம்',
      subtitle: 'உங்கள் AI-இயங்கும் கற்பித்தல் துணை',
      description: 'இந்தியாவில் பல-தர வகுப்பறைகளுக்காக சிறப்பாக வடிவமைக்கப்பட்டது',
      quickActions: 'விரைவு செயல்கள்',
      allFeatures: 'அனைத்து அம்சங்கள்',
      stats: {
        studentsHelped: 'மாணவர்களுக்கு உதவியது',
        contentCreated: 'உள்ளடக்கம் உருவாக்கப்பட்டது',
        timeSaved: 'நேரம் சேமிக்கப்பட்டது',
        teacherRating: 'ஆசிரியர் மதிப்பீடு'
      }
    },
    voice: {
      listening: 'கேட்கிறது...',
      speaking: 'பேசுகிறது...',
      ready: 'தயார்',
      startListening: 'குரல் கட்டளையைத் தொடங்கு',
      stopListening: 'கேட்பதை நிறுத்து',
      voiceCommands: 'குரல் கட்டளைகள்',
      currentLanguage: 'தற்போதைய மொழி',
      testVoice: 'குரல் சோதனை',
      speechRate: 'பேச்சு வேகம்',
      volume: 'ஒலியளவு'
    }
  },
  te: {
    common: {
      loading: 'లోడ్ అవుతోంది...',
      error: 'ఒక లోపం సంభవించింది',
      save: 'సేవ్ చేయండి',
      cancel: 'రద్దు చేయండి',
      delete: 'తొలగించండి',
      edit: 'సవరించండి',
      create: 'సృష్టించండి',
      search: 'వెతకండి',
      filter: 'ఫిల్టర్',
      export: 'ఎగుమతి',
      import: 'దిగుమతి',
      settings: 'సెట్టింగ్‌లు',
      profile: 'ప్రొఫైల్',
      logout: 'లాగ్ అవుట్',
      dashboard: 'డాష్‌బోర్డ్',
      back: 'వెనుక',
      next: 'తదుపరి',
      previous: 'మునుపటి',
      submit: 'సమర్పించండి',
      close: 'మూసివేయండి'
    },
    navigation: {
      home: 'హోమ్',
      contentGenerator: 'కంటెంట్ జెనరేటర్',
      worksheetCreator: 'వర్క్‌షీట్ క్రియేటర్',
      knowledgeBase: 'నాలెడ్జ్ బేస్',
      visualAids: 'విజువల్ ఎయిడ్స్',
      lessonPlanner: 'లెసన్ ప్లానర్',
      audioAssessment: 'ఆడియో అసెస్‌మెంట్',
      gamesGenerator: 'గేమ్స్ జెనరేటర్'
    },
    dashboard: {
      title: 'సహాయక్‌కు స్వాగతం',
      subtitle: 'మీ AI-శక్తితో కూడిన బోధనా సహాయకుడు',
      description: 'భారతదేశంలో బహుళ-గ్రేడ్ తరగతి గదుల కోసం ప్రత్యేకంగా రూపొందించబడింది',
      quickActions: 'త్వరిత చర్యలు',
      allFeatures: 'అన్ని ఫీచర్లు',
      stats: {
        studentsHelped: 'విద్యార్థులకు సహాయం చేసింది',
        contentCreated: 'కంటెంట్ సృష్టించబడింది',
        timeSaved: 'సమయం ఆదా చేయబడింది',
        teacherRating: 'టీచర్ రేటింగ్'
      }
    },
    voice: {
      listening: 'వింటోంది...',
      speaking: 'మాట్లాడుతోంది...',
      ready: 'సిద్ధం',
      startListening: 'వాయిస్ కమాండ్ ప్రారంభించండి',
      stopListening: 'వినడం ఆపండి',
      voiceCommands: 'వాయిస్ కమాండ్‌లు',
      currentLanguage: 'ప్రస్తుత భాష',
      testVoice: 'వాయిస్ టెస్ట్',
      speechRate: 'మాట్లాడే వేగం',
      volume: 'వాల్యూమ్'
    }
  }
};

export const MultilingualProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { profile } = useAuth();
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const languages = [
    { code: 'en', name: 'English', native: 'English' },
    { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
    { code: 'mr', name: 'Marathi', native: 'मराठी' },
    { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
    { code: 'te', name: 'Telugu', native: 'తెలుగు' },
  ];

  useEffect(() => {
    if (profile?.preferredLanguage) {
      setCurrentLanguage(profile.preferredLanguage);
    }
  }, [profile]);

  const setLanguage = (language: string) => {
    setCurrentLanguage(language);
    // Optionally update user profile
    if (profile) {
      // Update profile in context/database
    }
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[currentLanguage] || translations.en;
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return typeof value === 'string' ? value : key;
  };

  const value = {
    currentLanguage,
    setLanguage,
    t,
    languages
  };

  return (
    <MultilingualContext.Provider value={value}>
      {children}
    </MultilingualContext.Provider>
  );
};