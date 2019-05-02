/*
 WWS Customer Management Branch
 Italian language file

 Copyright 2016-2017 Auriga S.p.A.
*/

import i18n from "aurigauikit/i18n"

i18n.loadMessages("it", {
  "dates.month-names-short": [
    "Gen",
    "Feb",
    "Mar",
    "Apr",
    "Mag",
    "Giu",
    "Lug",
    "Ago",
    "Set",
    "Ott",
    "Nov",
    "Dic"
  ],

  "dates.day-names": ["Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"],

  "report.report-table.columns.report-template": "Report template",
  "report.report-table.columns.period": "Periodo",
  "report.report-table.columns.start-date": "Data inizio",
  "report.report-table.columns.end-date": "Data fine",
  "report.report-table.columns.state": "Stato",
  "report.report-table.columns.date": "Data aggiornamento stato",
  "report.report-table.report-state.COMPLETED": "Completato",
  "report.report-table.report-state.WAITING": "Da elaborare",
  "report.report-table.report-state.IN_CREATION": "In elaborazione",
  "report.report-table.report-state.READY": "Pronto",
  "report.report-table.report-state..ERROR": "Errore in fase di elaborazione",
  "report.report-table.columns.start-date.unvalued": "Non valorizzato",
  "report.report-table.columns.end-date.unvalued": "Non valorizzato",
  "report.report-table.empty-state": "Nessun report presente",
  "report.report-table.menu.view": "Visualizza",
  "report.report-table.menu.download.pdf": "Scarica (formato PDF)",
  "report.report-table.menu.download.csv": "Scarica (formato CSV)",
  "report.report-table.menu.delete": "Elimina",

  "report.delete-report-modal.title": "Avviso",
  "report.delete-report-modal.content": "Sei sicuro di voler eliminare il report?",
  "report.delete-report-modal.cancel-button": "Annulla",
  "report.delete-report-modal.confirm-button": "Conferma",

  "report.report-form.select-template": "Report template",
  "report.report-form.options.title": "Opzioni",
  "report.report-form.organizational-unit": "Unità Organizzativa",
  "report.report-form.start-date": "Data inizio",
  "report.report-form.end-date": "Data fine",
  "report.report-form.create-button": "Genera",
  "report.report-form.cancel-button": "Annulla",
  "organizational-unit.title": "Unità organizzativa",
  "organizational-unit-modal.reset": "Resetta",
  "organizational-unit-modal.cancel": "Annulla",
  "organizational-unit-modal.select": "Seleziona",

  "organizational-unit-modal.table.headers.ID": "ID",
  "organizational-unit-modal.table.headers.Name": "Nome",

  "organizational-unit-modal.table.headers.Code": "Codice",
  "organizational-unit-modal.table.headers.Description": "Descrizione",
  "organizational-unit-modal.table.headers.Type": "Tipo",

  "organizational-unit-select.ALL": "Tutta la selezione personalizzata",
  "organizational-unit-select.type.BANK": "Banca",
  "organizational-unit-select.type.AREA": "Area",
  "organizational-unit-select.type.BRANCH": "Filiale",
  "organizational-unit-select.type.PARENT_BANK": "Capogruppo",
  "organizational-unit-select.placeholder": "Seleziona unità organizzativa",

  "basic-filter.apply": "Applica",
  "basic-filter.reset": "Resetta",
  "basic-filter.previous": "Le mie ricerche",
  "basic-filter.save": "Salva ricerca",
  "basic-filter.restore": "Ripristina",
  "basic-filter.undo": "Annulla",
  "card.fullscreen.close-button": "Chiudi",

  "simple-table.loading-state": "Caricamento...",
  "simple-table.empty-state": "Nessun dato trovato",

  "scheduler.days.FRIDAY": "Venerdì",
  "scheduler.days.MONDAY": "Lunedì",
  "scheduler.days.SATURDAY": "Sabato",
  "scheduler.days.SUNDAY": "Domenica",
  "scheduler.days.THURSDAY": "Giovedì",
  "scheduler.days.TUESDAY": "Martedì",
  "scheduler.days.WEDNESDAY": "Mercoledì",
  "scheduler.labels.DAYS": "{value, plural, one {Giorno} other {Gorni}}",
  "scheduler.labels.MONTHS": "{value, plural, one {Mese} other {Mesi}}",
  "scheduler.labels.OCCURRENCIES": "{occurrencies, plural, one {Occorrenza} other {Occorrenze}}",
  "scheduler.labels.WEEKS": "{value, plural, one {Settimana} other {Settimane}}",
  "scheduler.labels.YEARS": "{value, plural, one {Anno} other {Anni}}",
  "scheduler.labels.after": "Dopo",
  "scheduler.labels.date": "Data",
  "scheduler.labels.day": "Giorno",
  "scheduler.labels.end": "Fine",
  "scheduler.labels.never": "Mai",
  "scheduler.labels.on": "Il",
  "scheduler.labels.recurring": "Ricorrenza",
  "scheduler.labels.repeat-every": "Ripeti ogni",
  "scheduler.months.APRIL": "Aprile",
  "scheduler.months.AUGUST": "Agosto",
  "scheduler.months.DECEMBER": "Dicembre",
  "scheduler.months.FEBRUARY": "Febbraio",
  "scheduler.months.JANUARY": "Gennaio",
  "scheduler.months.JULY": "Luglio",
  "scheduler.months.JUNE": "Giugno",
  "scheduler.months.MARCH": "Marzo",
  "scheduler.months.MAY": "Maggio",
  "scheduler.months.NOVEMBER": "Novembre",
  "scheduler.months.OCTOBER": "Ottobre",
  "scheduler.months.SEPTEMBER": "Settembre",
  "scheduler.orders.FIRST": "Primo",
  "scheduler.orders.FOURTH": "Quarto",
  "scheduler.orders.LAST": "Ultimo",
  "scheduler.orders.SECOND": "Secondo",
  "scheduler.orders.THIRD": "Terzo",
  "scheduler.recurrings.DAILY": "Quotidiana",
  "scheduler.recurrings.MONTHLY": "Mensile",
  "scheduler.recurrings.NEVER": "Nessuna",
  "scheduler.recurrings.WEEKLY": "Settimanale",
  "scheduler.recurrings.YEARLY": "Annuale",

  "page.anchors.table-of-contents": "Tabella dei contenuti",
  "page.anchors.back-to-top": "Torna all'inizio",

  "organizational-unit-select.type.PRIVATE": "Privato",
  "organizational-unit-select.type.PUBLIC": "Pubblico",
  "organizational-unit-select.type.ASSET_GROUP": "Grouppo di Asset",

  "notification.emptyList": "Nessuna notifica",

  "dashboard-page.add-widget.new": "Nuovo"
})
