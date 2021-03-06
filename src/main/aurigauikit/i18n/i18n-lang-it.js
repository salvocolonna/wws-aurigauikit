/*
 WWS Customer Management Branch
 Italian language file

 Copyright 2016-2017 Auriga S.p.A.
*/

import i18n from 'aurigauikit/i18n'

i18n.loadMessages('it', {
  closed: 'Chiuso',
  'session-expired': 'La sessione è scaduta, effettuare una nuova autenticazione',
  back: 'Indietro',
  save: 'Salva',
  saving: 'Salvataggio...',
  next: 'Avanti',
  'scheduler.validations.at-least-a-day': 'Seleziona almeno un giorno',
  'organizational-unit.no-items': 'Nessun elemento corrispondente a "{value}"',
  'organizational-unit.search': 'Cerca',
  'aurigauikit.groups.filter.not-public.ALL': 'Tutti',
  'aurigauikit.groups.filter.not-public.YES': 'Si',
  'aurigauikit.groups.filter.not-public.NO': 'No',
  'aurigauikit.groups.filter.selected-branches-error':
    'Si prega di aggiungere almeno una filiale al gruppo',
  'aurigauikit.groups.filter.error-saving': 'Errore nel salvataggio del gruppo filiali',
  'aurigauikit.groups.filter.saving-successfully':
    'Salvataggio del gruppo filiali avvenuto con successo',
  'aurigauikit.groups.filter.edit-successfully':
    'Modifiche del gruppo filiali avvenute con successo',

  'dates.month-names-short': [
    'Gen',
    'Feb',
    'Mar',
    'Apr',
    'Mag',
    'Giu',
    'Lug',
    'Ago',
    'Set',
    'Ott',
    'Nov',
    'Dic',
  ],

  'dates.day-names': ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom'],
  'report.report-table.columns.report-template': 'Report template',
  'report.report-table.columns.period': 'Ricorrenza',
  'report.report-table.columns.start-date': 'Data inizio',
  'report.report-table.columns.end-date': 'Data fine',
  'report.report-table.columns.status': 'Stato',
  'report.report-table.columns.date': 'Data aggiornamento stato',
  'report.schedulation-table.recurrence.NEVER': 'Mai',
  'report.schedulation-table.recurrence.DAILY': 'Giornaliera',
  'report.schedulation-table.recurrence.WEEKLY': 'Settimanale',
  'report.schedulation-table.recurrence.MONTHLY': 'Mensile',
  'report.report-table.report-state.COMPLETED': 'Completato',
  'report.report-table.report-state.ERROR': 'Errore',
  'report.report-table.report-state.WAITING': 'Da elaborare',
  'report.report-table.report-state.IN_CREATION': 'In elaborazione',
  'report.report-table.report-state.READY': 'Pronto',
  'report.report-table.report-state.START': 'In corso',
  'report.report-table.columns.start-date.unvalued': 'Non valorizzato',
  'report.report-table.columns.end-date.unvalued': 'Non valorizzato',
  'report.report-table.empty-state': 'Nessun report presente',
  'report.report-table.menu.view': 'Visualizza',
  'report.report-table.menu.download.pdf': 'Scarica (formato PDF)',
  'report.report-table.menu.download.csv': 'Scarica (formato CSV)',
  'report.report-table.menu.delete': 'Elimina',
  'report.delete-schedulation-modal.title': 'Elimina Schedulazione',
  'report.delete-report-modal.title': 'Elimina Report',
  'delete-modal.content': 'Hai scelto di eliminare {name}. Continuare?',
  'report.report-form.select-template': 'Report template',
  'report.report-form.options.title': 'Opzioni',
  'report.report-form.organizational-unit': 'Unità Organizzativa',
  'report.report-form.start-date': 'Data inizio',
  'report.report-form.end-date': 'Data fine',
  'report.report-form.create-button': 'Genera',
  'report.report-form.cancel-button': 'Annulla',
  'organizational-unit.title': 'Unità organizzativa',
  'organizational-unit-modal.reset': 'Resetta',
  'organizational-unit-modal.cancel': 'Annulla',
  'organizational-unit-modal.select': 'Seleziona',

  'organizational-unit-modal.table.headers.ID': 'ID',
  'organizational-unit-modal.table.headers.Name': 'Nome',

  'organizational-unit-modal.table.headers.Code': 'Codice',
  'organizational-unit-modal.table.headers.Description': 'Descrizione',
  'organizational-unit-modal.table.headers.Type': 'Tipo',

  'organizational-unit-select.ALL': 'Tutta la selezione personalizzata',
  'organizational-unit-select.type.BANK': 'Banca',
  'organizational-unit-select.type.AREA': 'Area',
  'organizational-unit-select.type.BRANCH': 'Filiale',
  'organizational-unit-select.type.PARENT_BANK': 'Capogruppo',
  'organizational-unit-select.type.PROVINCE': 'Provincia',
  'organizational-unit-select.type.REGION': 'Regione',
  'organizational-unit-select.type.POSTAL_CODE': 'Codice postale',
  'organizational-unit-select.placeholder': 'Seleziona unità organizzativa',

  'basic-filter.apply': 'Applica',
  'basic-filter.reset': 'Resetta',
  'basic-filter.previous': 'Le mie ricerche',
  'basic-filter.save': 'Salva ricerca',
  'basic-filter.restore': 'Ripristina',
  'basic-filter.undo': 'Annulla',
  'card.fullscreen.close-button': 'Chiudi',

  'simple-table.loading-state': 'Caricamento...',
  'simple-table.empty-state': 'Nessun dato trovato',
  'pagination.total-elements': '{size} di {count} {count, plural, one {elemento} other {elementi}}',
  'pagination.total-pages': 'Pagina {page} di {count}',

  'scheduler.days.FRIDAY': 'Venerdì',
  'scheduler.days.MONDAY': 'Lunedì',
  'scheduler.days.SATURDAY': 'Sabato',
  'scheduler.days.SUNDAY': 'Domenica',
  'scheduler.days.THURSDAY': 'Giovedì',
  'scheduler.days.TUESDAY': 'Martedì',
  'scheduler.days.WEDNESDAY': 'Mercoledì',
  'scheduler.labels.DAYS': '{value, plural, one {Giorno} other {Gorni}}',
  'scheduler.labels.MONTHS': '{value, plural, one {Mese} other {Mesi}}',
  'scheduler.labels.OCCURRENCIES': '{occurrencies, plural, one {Occorrenza} other {Occorrenze}}',
  'scheduler.labels.WEEKS': '{value, plural, one {Settimana} other {Settimane}}',
  'scheduler.labels.YEARS': '{value, plural, one {Anno} other {Anni}}',
  'scheduler.labels.after': 'Dopo',
  'scheduler.labels.date': 'Data inizio',
  'scheduler.labels.day': 'Giorno',
  'scheduler.labels.end': 'Data fine',
  'scheduler.labels.never': 'Mai',
  'scheduler.labels.on': 'Il',
  'scheduler.labels.when': 'Quando',
  'scheduler.labels.recurring': 'Ricorrenza',
  'scheduler.labels.repeat-every': 'Ripeti ogni',
  'scheduler.months.APRIL': 'Aprile',
  'scheduler.months.AUGUST': 'Agosto',
  'scheduler.months.DECEMBER': 'Dicembre',
  'scheduler.months.FEBRUARY': 'Febbraio',
  'scheduler.months.JANUARY': 'Gennaio',
  'scheduler.months.JULY': 'Luglio',
  'scheduler.months.JUNE': 'Giugno',
  'scheduler.months.MARCH': 'Marzo',
  'scheduler.months.MAY': 'Maggio',
  'scheduler.months.NOVEMBER': 'Novembre',
  'scheduler.months.OCTOBER': 'Ottobre',
  'scheduler.months.SEPTEMBER': 'Settembre',
  'scheduler.orders.FIRST': 'Primo',
  'scheduler.orders.FOURTH': 'Quarto',
  'scheduler.orders.LAST': 'Ultimo',
  'scheduler.orders.SECOND': 'Secondo',
  'scheduler.orders.THIRD': 'Terzo',
  'scheduler.recurrings.DAILY': 'Quotidiana',
  'scheduler.recurrings.MONTHLY': 'Mensile',
  'scheduler.recurrings.NEVER': 'Nessuna',
  'scheduler.recurrings.WEEKLY': 'Settimanale',
  'scheduler.recurrings.YEARLY': 'Annuale',
  'scheduler.validations.end-greater': 'La data finale deve essere maggiore della data iniziale',

  'page.anchors.table-of-contents': 'Tabella dei contenuti',
  'page.anchors.back-to-top': "Torna all'inizio",

  'organizational-unit-select.type.PRIVATE': 'Privato',
  'organizational-unit-select.type.PUBLIC': 'Pubblico',
  'organizational-unit-select.type.ASSET_GROUP': 'Gruppi',

  'notification.emptyList': 'Nessuna notifica',
  'notification.task.ok': 'Attività completata con successo',
  'notification.task.warning': 'Attività parzialmente completata',
  'notification.task.error': "Errore nell'esecuzione dell'attività",
  'notification.report.ok': 'Report generato con successo',
  'notification.report.error': 'Errore nella generazione del report',
  'notification.profile.error.asset': 'Errore nel recupero del profilo',

  'dashboard-page.add-widget.new': 'Nuovo',

  'status-code.OK': 'Confirmatory',
  'status-code.WARN': 'Warning',
  'status-code.CRITICAL': 'Critical',
  'status-code.WAITING': 'Info',

  'error-page.title': 'Ops!',
  'error-page.subtitle': 'Qualcosa è andato storto!',
  'error-page.text': 'Riprova oppure vai alla',
  'error-page.link': 'pagina iniziale',
  'error-page.button': 'Segnala errore',
  'report.report-table.report-name.head-table': 'Nome report',
  'report.schedulation-table.menu.edit': 'Modifica',
  'report.schedulation-table.menu.enable': 'Attiva',
  'report.schedulation-table.menu.delete': 'Elimina',
  'report.schedulation-table.columns.status': 'Stato',
  'report.schedulation-table.report-state.DISABLED': 'Disabilitato',
  'report.schedulation-table.report-name.head-table': 'Nome della pianificazione',
  'report.schedulation-table.columns.report-template': 'Template',
  'report.schedulation-table.columns.start-date': 'Inizio',
  'report.schedulation-table.columns.end-date': 'Fine',
  'report.schedulation-table.columns.recurrence': 'Frequenza',
  'report.delete-schedulation-modal.next-schedulation': 'Prossima pianificazione',
  'report.schedulation-table.empty-state': 'Non è stata trovata nessuna schedulazione.',
  'report-schedulation-page.report': 'Report',
  'report-schedulation-page.report-schedulation': 'Schedulazione report',
  'report-schedulation-page.new': 'Nuovo',
  'report-schedulation-form.organizational-unit': 'Unità organizzativa',
  'report-schedulation-form.template': 'Template',

  'report-schedulation-form.report-name': 'Nome report',
  'report-schedulation-form.start-date': 'Data inizio',
  'report-schedulation-form.duration': 'Durata',
  'report-schedulation-form.previous-month': 'Mese precedente',
  'report-schedulation-form.schedulation': 'Pianificazione',
  'report-schedulation-form.undo': 'Annulla',
  'report-schedulation-form.confirm': 'Conferma',
  'report-schedulation-page.error-templates': 'Errore nel template',

  'report-form.organizational-unit': 'Unità organizzativa',
  'report-form.template': 'Template',
  'report-form.report-name': 'Nome report',
  'report-form.start-date': 'Data inizio',
  'report-form.end-date': 'Data fine',
  'report-form.undo': 'Annulla',
  'report-form.confirm': 'Conferma',
  'report-form.end-greater': 'La data finale non può essere superiore alla data di oggi',
  'report-schedulation-list-page.report': 'Report',
})
