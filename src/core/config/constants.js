export const CONTACT_INFO = {
    _einfo: 'YmVuamFtaW4uYXlhbGEuZGV2QGdtYWlsLmNvbQ==',
    get email() {
        return typeof window !== 'undefined' ? atob(this._einfo) : '';
    },
    subject: 'Oportunidad de colaboración'
};

export const SOCIAL_LINKS = {
    github: 'https://github.com/benjaminayala0',
    linkedin: 'https://www.linkedin.com/in/benjamínayala/'
};

export const CV_URLS = {
    es: '/CV_Benjamin_Ayala_ES.pdf',
    en: '/CV_Benjamin_Ayala_EN.pdf'
};
