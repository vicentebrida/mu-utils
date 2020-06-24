function localeApp(locale, msg) {
  if (locale === 'pt-BR') {
    switch (msg) {
      case 'ButtonLogoff':
        return 'Logoff';
        break;
      case 'ButtonAbout':
        return 'Sobre';
        break;
      case 'ButtonDonation':
        return 'Doar';
        break;
      case 'TextAlertDisconnect':
        return 'Avisar quando a internet desconectar';
        break;
      case 'TextSendPrint':
        return 'Enviar printscreen automaticamente das janelas';
        break;
      case 'TextSendPrintTime':
        return 'Enviar a cada|hora(s)';
        break;
      default:
        break;
    }
  } else {
    switch (msg) {
      case 'ButtonLogoff':
        return 'Logoff';
        break;
      case 'ButtonAbout':
        return 'About';
        break;
      case 'ButtonDonation':
        return 'Donation';
        break;
      case 'TextAlertDisconnect':
        return 'Avisar quando a internet desconectar';
        break;
      case 'TextSendPrint':
        return 'Enviar printscreen automaticamente das janelas';
        break;
      case 'TextSendPrintTime':
        return 'Enviar a cada|hora(s)';
        break;
      default:
        break;
    }
  }
}
