window.localization = window.localization || {},
function(n) {
  localization.translate = {
    sign: () => {
      $('#name').attr('placeholder', i18n.__('Name'));
      $('#email').attr('placeholder', i18n.__('E-mail'));
      $('#username').attr('placeholder', i18n.__('Username'));
      $('#password').attr('placeholder', i18n.__('Password'));
      $('#textRemember').html(i18n.__('Remember me'));
      $('#linkSignUp').text(i18n.__('Create account'));
      $('#linkSignIn').text(i18n.__('I have account'));
      $('#buttonSignUp').text(i18n.__('Sign up'));
      $('#buttonSignIn').text(i18n.__('Sign in'));
    },
    main: () => {
      $('#buttonLogoff').text(i18n.__('Log out'));
      $('#buttonAbout').text(i18n.__('About'));
      $('#linkProfile').text(i18n.__('My profile'));
      $('#textAlertDisconnect').text(i18n.__('Warn when internet disconnects'));
      $('#textSendPrint').text(i18n.__('Automatically send screenshots of MU windows'));
      $('#textSendPrintTime').text(i18n.__('Send every'));
      $('#textSendPrintTimeHours').text(i18n.__('hour(s)'));
      $('#buttonDonation').text(i18n.__('Like app? Donate!'));
      $('#textSendTo').text(i18n.__('Send to'));
      $('#textOptions').text(i18n.__('Options'));
      $('#textFollow').text(i18n.__('Follow'));
      $('#textToReceive').text(i18n.__('to receive'));
    },
    about: () => {
      $('#textVersion').text(i18n.__('Version'));
      $('#textDeveloped').text(i18n.__('Developed by'));
      $('.contributors').text(i18n.__('Donations (Thanks)'));
    },
    init: function() {
      this.sign();
      this.main();
      this.about();
    }
  };

  n(function() {
    localization.translate.init();
  });
}($);
