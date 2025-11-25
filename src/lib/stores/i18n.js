import { writable, derived } from 'svelte/store';
import { browser } from '$app/environment';

const translations = {
	tr: {
		navbar: {
			home: 'Anasayfa',
			fuelCalculation: 'Yakıt Hesaplama',
			creditCalculation: 'Kredi Hesaplama',
			vatCalculation: 'KDV Hesaplama',
			allCalculations: 'Tüm Hesaplamalar',
			contact: 'İletişim',
			menuToggle: 'Menüyü aç/kapat'
		},
		hero: {
			title: "Türkiye'nin En Pratik Hesaplama Merkezi",
			subtitle: 'Gerçek hayat senaryoları için hızlı, doğru ve ücretsiz hesaplama araçlarını tek bir merkezde topluyoruz. İster uzun bir yolculuk planlayın ister kredi ödemelerinizi netleştirin, TR-Pratik her adımda yanınızda.'
		},
		buttons: {
			calculate: 'Hesapla',
			calculating: 'Hesaplanıyor...',
			result: 'Sonuç',
			openTool: 'Aracı aç'
		},
		cards: {
			fuelCalculation: 'Yakıt Hesaplama',
			fuelDescription: 'İller arası veya mesafe bazlı yakıt masrafınızı hesaplayın.',
			fuelCta: 'Yakıt aracını aç',
			creditCalculation: 'Kredi Hesaplama',
			creditDescription: 'İhtiyaç, Taşıt veya Konut kredisi geri ödeme planınızı oluşturun.',
			creditCta: 'Kredi aracını aç',
			vatCalculation: 'KDV Hesaplama',
			vatDescription: 'KDV tutarlarınızı saniyeler içinde öğrenin. Tevkifat desteği ile profesyonel hesaplamalar.',
			vatCta: 'KDV aracını aç',
			comingSoon: 'Yakında'
		},
		common: {
			whyTitle: 'Neden TR-Pratik?',
			whyDescription: '<strong>Hızlı:</strong> Gereksiz form doldurmadan saniyeler içinde sonuç alın. <strong>Doğru:</strong> Güncel veriler ve gerçekçi varsayımlar kullanılır. <strong>Ücretsiz:</strong> Tüm araçlarımız kısıtlama olmadan herkesin kullanımına açıktır.',
			copyright: 'Tüm hakları saklıdır.',
			optimized: 'Performans ve SEO için optimize edilmiştir.'
		}
	},
	en: {
		navbar: {
			home: 'Home',
			fuelCalculation: 'Fuel Calculation',
			creditCalculation: 'Credit Calculation',
			vatCalculation: 'VAT Calculation',
			allCalculations: 'All Calculations',
			contact: 'Contact',
			menuToggle: 'Toggle menu'
		},
		hero: {
			title: "Turkey's Most Practical Calculation Hub",
			subtitle: 'We bring together fast, accurate and free calculation tools for real-life scenarios in one central place. Whether planning a long trip or clarifying your loan payments, TR-Pratik is with you every step of the way.'
		},
		buttons: {
			calculate: 'Calculate',
			calculating: 'Calculating...',
			result: 'Result',
			openTool: 'Open tool'
		},
		cards: {
			fuelCalculation: 'Fuel Calculation',
			fuelDescription: 'Calculate your intercity or distance-based fuel costs.',
			fuelCta: 'Open fuel tool',
			creditCalculation: 'Credit Calculation',
			creditDescription: 'Create your repayment plan for Consumer, Vehicle or Housing loans.',
			creditCta: 'Open credit tool',
			vatCalculation: 'VAT Calculation',
			vatDescription: 'Find out your VAT amounts in seconds. Professional calculations with withholding support.',
			vatCta: 'Open VAT tool',
			comingSoon: 'Coming Soon'
		},
		common: {
			whyTitle: 'Why TR-Pratik?',
			whyDescription: '<strong>Fast:</strong> Get results in seconds without filling unnecessary forms. <strong>Accurate:</strong> Current data and realistic assumptions are used. <strong>Free:</strong> All our tools are open to everyone without restrictions.',
			copyright: 'All rights reserved.',
			optimized: 'Optimized for performance and SEO.'
		}
	}
};

// Initialize locale from localStorage if available, otherwise default to 'tr'
function getInitialLocale() {
	if (browser) {
		const stored = localStorage.getItem('locale');
		return stored === 'en' || stored === 'tr' ? stored : 'tr';
	}
	return 'tr';
}

export const locale = writable(getInitialLocale());

// Persist locale changes to localStorage
if (browser) {
	locale.subscribe((value) => {
		localStorage.setItem('locale', value);
	});
}

/**
 * Translation function store
 * Usage: $t('navbar.home') returns 'Anasayfa' or 'Home' based on current locale
 */
export const t = derived(locale, ($locale) => {
	return (key) => {
		const keys = key.split('.');
		let value = translations[$locale];
		
		for (const k of keys) {
			if (value && typeof value === 'object' && k in value) {
				value = value[k];
			} else {
				console.warn(`Translation key not found: ${key}`);
				return key; // Return the key itself if translation is missing
			}
		}
		
		return value;
	};
});

