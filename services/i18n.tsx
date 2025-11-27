import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Language } from '../types';

// Translation Dictionary
export const translations = {
  zh: {
    nav: {
      home: '首页',
      products: '产品系列',
      customize: '定制服务',
      technology: '关于工艺',
      contact: '联系我们',
    },
    hero: {
      badge: '航空 & 军工级复合材料',
      title_1: '轻量化。',
      title_2: '极致强度。',
      title_3: '未来工艺。',
      description: 'CarbonX 专注于高端碳纤维部件的定制与研发。无论是高性能赛车配件、民用级无人机机架，还是严苛的军工级防护装备，我们都用最纯粹的工艺为您呈现。',
      cta_products: '浏览产品',
      cta_customize: '立即定制',
    },
    products: {
      title: '精选产品',
      subtitle: '现货发售与热门定制案例展示 (无人机 / 军工 / 汽车)',
      view_all: '查看所有',
      items: {
        steering_wheel: '锻造碳纤维方向盘',
        spoiler: 'Model 3/Y 尾翼',
        cardholder: '超薄碳纤维卡夹',
        drone_frame: '5英寸竞速无人机架',
        military_plate: '军工级防弹插板',
        engine_cover: '定制引擎盖',
      },
      categories: {
        automotive: '汽车',
        lifestyle: '生活',
        tech: '科技',
        military: '军工',
      }
    },
    technology: {
      title: '工艺优势',
      lightweight: {
        title: '极致轻量',
        desc: '比钢材轻 5 倍，比铝材轻 30%。我们的干碳工艺（Dry Carbon）进一步减少树脂含量，追求极限减重，非常适合无人机续航优化。',
      },
      strength: {
        title: '超高强度',
        desc: '采用 T700/T800 航空级碳纤维原丝，经过高温高压固化。我们具备生产军工级结构件的能力，提供无与伦比的抗拉强度。',
      },
      durability: {
        title: '耐高温腐蚀',
        desc: '配合特制环氧树脂系统，产品具有极佳的耐化学腐蚀性和耐热性，适合引擎舱及恶劣野外环境。',
      }
    },
    customizer: {
      submitted: '需求已提交',
      submitted_desc: '我们的工程师已收到您的定制需求。我们将通过 Email 与您联系，提供报价和3D预览。',
      new_request: '提交新的需求',
      title: '专属定制',
      title_sub: 'YOUR WAY',
      description: '不仅仅是产品，更是艺术品。从方向盘到工业级无人机机架，我们使用航空级 Pre-preg 干碳技术，为您打造极致轻量化与强度的完美结合。',
      step_weave: '选择纹理',
      step_weave_desc: '提供 3K 斜纹、平纹、蜂窝纹以及兰博基尼同款锻造乱纹。',
      step_upload: '上传或描述',
      step_upload_desc: '如果有图纸请直接上传，或详细描述您的需求，我们提供设计服务。',
      form: {
        name: '姓名 / 称呼',
        email: '联系邮箱',
        part_type: '定制部件类型',
        weave_type: '选择碳纤维纹路',
        details: '需求详情',
        details_placeholder: '请描述您的车型、尺寸要求或特殊工艺需求 (如：无人机轴距、军工标准...)',
        submit: '提交评估',
        types: {
          automotive_ext: '汽车外观 (包围/尾翼)',
          automotive_int: '汽车内饰 (方向盘)',
          drone: '无人机/穿越机部件',
          military: '军工/防护装备',
          consumer: '电子产品 (键盘/手机)',
          other: '其他',
        }
      }
    },
    footer: {
      desc: '重新定义高性能美学。我们致力于为全球发烧友及专业机构提供最顶级的碳纤维定制方案。',
      explore: '浏览',
      legal: '法律',
      contact: '联系我们',
      rights: 'CarbonX Inc. 保留所有权利。',
    },
    chat: {
      welcome: '你好！我是 CarbonX 的 AI 顾问。我可以为您介绍无人机配件、军工级定制或汽车改装件。请问有什么可以帮您？',
      placeholder: '咨询军工级材料、定制无人机...',
      toggle: 'AI 顾问咨询'
    }
  },
  en: {
    nav: {
      home: 'Home',
      products: 'Products',
      customize: 'Customize',
      technology: 'Technology',
      contact: 'Contact',
    },
    hero: {
      badge: 'AEROSPACE & MILITARY GRADE',
      title_1: 'Lightweight.',
      title_2: 'Extreme Strength.',
      title_3: 'Future Craft.',
      description: 'CarbonX specializes in premium carbon fiber customization. From high-performance racing parts and military-grade equipment to consumer drone frames, we deliver with the purest craftsmanship.',
      cta_products: 'View Products',
      cta_customize: 'Start Customizing',
    },
    products: {
      title: 'Featured Products',
      subtitle: 'In-stock items and popular custom cases (Drones / Military / Auto)',
      view_all: 'View All',
      items: {
        steering_wheel: 'Forged Carbon Steering Wheel',
        spoiler: 'Model 3/Y Aero Spoiler',
        cardholder: 'Slim Carbon Cardholder',
        drone_frame: '5" FPV Drone Frame',
        military_plate: 'Military Grade Armor Plate',
        engine_cover: 'Custom Engine Cover',
      },
      categories: {
        automotive: 'Automotive',
        lifestyle: 'Lifestyle',
        tech: 'Tech',
        military: 'Military',
      }
    },
    technology: {
      title: 'Our Technology',
      lightweight: {
        title: 'Ultra Lightweight',
        desc: '5x lighter than steel, 30% lighter than aluminum. Our Dry Carbon process minimizes resin for extreme weight reduction, perfect for drone endurance.',
      },
      strength: {
        title: 'High Strength',
        desc: 'Using T700/T800 aerospace fibers. We are capable of manufacturing military-grade structural components with unmatched tensile strength.',
      },
      durability: {
        title: 'Durability',
        desc: 'Advanced epoxy resin systems provide excellent chemical and heat resistance, suitable for engine bays and harsh field environments.',
      }
    },
    customizer: {
      submitted: 'Request Submitted',
      submitted_desc: 'Our engineers have received your request. We will contact you via Email with a quote and 3D preview.',
      new_request: 'New Request',
      title: 'Custom Build',
      title_sub: 'YOUR WAY',
      description: 'More than just parts, they are art. From steering wheels to industrial drone frames, we use aerospace Pre-preg technology to combine extreme lightness with strength.',
      step_weave: 'Select Weave',
      step_weave_desc: 'Available in 3K Twill, Plain, Honeycomb, and Forged Carbon.',
      step_upload: 'Upload or Describe',
      step_upload_desc: 'Upload blueprints or describe your needs. Design services available.',
      form: {
        name: 'NAME',
        email: 'EMAIL',
        part_type: 'PART TYPE',
        weave_type: 'WEAVE PATTERN',
        details: 'DETAILS',
        details_placeholder: 'Describe your model, dimensions, or specs (e.g., Drone wheelbase, Military standard...)',
        submit: 'Submit for Review',
        types: {
          automotive_ext: 'Automotive Exterior',
          automotive_int: 'Automotive Interior',
          drone: 'Drone/FPV Parts',
          military: 'Military/Tactical Gear',
          consumer: 'Electronics',
          other: 'Other',
        }
      }
    },
    footer: {
      desc: 'Redefining performance aesthetics. We provide top-tier carbon fiber solutions for enthusiasts and professionals worldwide.',
      explore: 'Explore',
      legal: 'Legal',
      contact: 'Contact Us',
      rights: 'CarbonX Inc. All rights reserved.',
    },
    chat: {
      welcome: 'Hello! I am CarbonX\'s AI Consultant. I can help with drone parts, military-grade customs, or auto parts. How can I assist?',
      placeholder: 'Ask about military grade, drone frames...',
      toggle: 'AI Consultant'
    }
  },
  es: {
    nav: {
      home: 'Inicio',
      products: 'Productos',
      customize: 'Personalizar',
      technology: 'Tecnología',
      contact: 'Contacto',
    },
    hero: {
      badge: 'GRADO AEROESPACIAL Y MILITAR',
      title_1: 'Ligereza.',
      title_2: 'Resistencia Extrema.',
      title_3: 'Artesanía Futura.',
      description: 'CarbonX se especializa en la personalización de fibra de carbono. Desde piezas de carreras y equipo militar hasta chasis de drones, entregamos la artesanía más pura.',
      cta_products: 'Ver Productos',
      cta_customize: 'Personalizar',
    },
    products: {
      title: 'Productos Destacados',
      subtitle: 'Artículos en stock y casos personalizados (Drones / Militar / Auto)',
      view_all: 'Ver Todo',
      items: {
        steering_wheel: 'Volante de Carbono Forjado',
        spoiler: 'Alerón Model 3/Y',
        cardholder: 'Cartera Slim de Carbono',
        drone_frame: 'Chasis Drone FPV 5"',
        military_plate: 'Placa de Blindaje Militar',
        engine_cover: 'Cubierta de Motor',
      },
      categories: {
        automotive: 'Automotriz',
        lifestyle: 'Estilo',
        tech: 'Tecnología',
        military: 'Militar',
      }
    },
    technology: {
      title: 'Tecnología',
      lightweight: {
        title: 'Ultra Ligero',
        desc: '5x más ligero que el acero. Nuestro proceso Dry Carbon minimiza la resina para una reducción extrema de peso, ideal para drones.',
      },
      strength: {
        title: 'Alta Resistencia',
        desc: 'Usamos fibras aeroespaciales T700/T800. Fabricamos componentes estructurales de grado militar con resistencia inigualable.',
      },
      durability: {
        title: 'Durabilidad',
        desc: 'Sistemas avanzados de resina epoxi proporcionan excelente resistencia química y térmica, aptos para entornos hostiles.',
      }
    },
    customizer: {
      submitted: 'Solicitud Enviada',
      submitted_desc: 'Nuestros ingenieros han recibido su solicitud. Le contactaremos por Email con una cotización.',
      new_request: 'Nueva Solicitud',
      title: 'Personalización',
      title_sub: 'A TU MANERA',
      description: 'Más que piezas, es arte. Desde volantes hasta chasis de drones industriales, usamos tecnología Pre-preg para combinar ligereza y fuerza.',
      step_weave: 'Elegir Tejido',
      step_weave_desc: 'Disponible en Sarga 3K, Liso, Panal y Carbono Forjado.',
      step_upload: 'Subir o Describir',
      step_upload_desc: 'Suba planos o describa sus necesidades. Ofrecemos servicios de diseño.',
      form: {
        name: 'NOMBRE',
        email: 'EMAIL',
        part_type: 'TIPO DE PIEZA',
        weave_type: 'TIPO DE TEJIDO',
        details: 'DETALLES',
        details_placeholder: 'Describa modelo, dimensiones o especificaciones (ej: Drones, Estándar militar...)',
        submit: 'Enviar para Revisión',
        types: {
          automotive_ext: 'Exterior Automotriz',
          automotive_int: 'Interior Automotriz',
          drone: 'Partes de Drone/FPV',
          military: 'Equipo Militar/Táctico',
          consumer: 'Electrónica',
          other: 'Otro',
        }
      }
    },
    footer: {
      desc: 'Redefiniendo la estética del rendimiento. Proveemos soluciones de fibra de carbono de primer nivel.',
      explore: 'Explorar',
      legal: 'Legal',
      contact: 'Contacto',
      rights: 'CarbonX Inc. Todos los derechos reservados.',
    },
    chat: {
      welcome: '¡Hola! Soy el consultor IA de CarbonX. Puedo ayudar con partes de drones, grado militar o autos. ¿En qué puedo ayudarle?',
      placeholder: 'Pregunte sobre material militar...',
      toggle: 'Consultor IA'
    }
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations['zh'];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('zh'); // Default to zh initially

  useEffect(() => {
    const browserLang = navigator.language.split('-')[0];
    if (browserLang === 'en' || browserLang === 'es' || browserLang === 'zh') {
      setLanguage(browserLang as Language);
    }
    // else stick to default 'zh'
  }, []);

  const value = {
    language,
    setLanguage,
    t: translations[language],
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
