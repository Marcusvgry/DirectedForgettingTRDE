import type { InstructionTexts } from "../types/d.ts";

export const instructionTexts: InstructionTexts = {
  welcome_de: `
    <p>Sehr geehrte Teilnehmerin, sehr geehrter Teilnehmer,</p>
    <p>vielen Dank für deine Teilnahme an dieser Studie.</p>
    <p>Im Folgenden bitten wir dich, zürst einige Fragen zu dir und deinem alltäglichen Sprachgebrauch zu beantworten.</p>
    <p>Anschliessend werden dir einzelne Wörter (Deutsch oder Türkisch) gezeigt, die du entweder erinnern oder vergessen sollst.</p>
    <p>Die Teilnahme ist freiwillig und du kannst das Experiment jederzeit ohne Angabe von Gründen abbrechen; deine Daten werden dann gelöscht.</p>
    <p>Die Daten werden anonymisiert erfasst und ausschliesslich zu Forschungszwecken genutzt.</p>
    <p>Bitte antworte während der gesamten Studie so ehrlich und genau wie möglich.</p>
  `,
  welcome_tr: `
    <p>Sayin katilimci,</p>
    <p>bu calismaya katildigin icin tesekkur ederiz.</p>
    <p>Once senden, kendin ve gunluk dil kullaniminla ilgili bazi sorulari yanitlamani isteyecegiz.</p>
    <p>Ardindan sana tek tek kelimeler (Almanca veya Turkce) sunulacak; bu kelimeleri ya hatirlaman ya da unutman gerekecek.</p>
    <p>Katilim gonulludur. Istedigin zaman, gerekce belirtmeden deneyi sonlandirabilirsin; bu durumda verilerin silinir.</p>
    <p>Veriler anonim olarak kaydedilir ve yalnizca bilimsel arastirma amaciyla kullanilir.</p>
    <p>Bu nedenle calisma boyunca lutfen olabildigince durust ve dogru sekilde yanit ver.</p>
  `,
  consent_de: `
    <p>Hiermit bestätige ich, die Informationen gelesen zu haben, und stimme der Nutzung meiner Daten zu Forschungszwecken zu.</p>
    <p>Mit "Weiter" gibst du dein Einverständnis zur Teilnahme.</p>
  `,
  consent_tr: `
    <p>Burada, bilgileri okudugumu ve verilerimin bu arastirma kapsaminda kullanilmasina onay verdigimi beyan ederim.</p>
    <p>"Devam" tusuna basarak katilim onayini vermis olursun.</p>
  `,
  general_de: `
    <p>Bevor es richtig losgeht, machst du einen kurzen übungsdurchlauf, um dich mit der Aufgabe vertraut zu machen.</p>
    <p>Dir werden einzelne Wörter (Deutsch oder Türkisch) präsentiert.</p>
    <p>Danach erscheint ein Hinweissymbol, das angibt, ob du das Wort merken oder vergessen sollst.</p>
    <p>Ein rotes Kreuz ❌ bedeutet: vergessen. Ein grüner Haken ✅ bedeutet: erinnern.</p>
  `,
  general_tr: `
    <p>Deney asamasina gecmeden once, goreve alisman icin kisa bir deneme turu yapacaksin.</p>
    <p>Sana tek tek kelimeler (Almanca veya Turkce) sunulacak.</p>
    <p>Hemen ardindan, kelimeyi hatirlaman mi yoksa unutman mi gerektigini gosteren bir isaret cikacak.</p>
    <p>Kirmizi carpı ❌: unut. Yesil onay ✅: hatirla.</p>
  `,
  practice_de: `
    <p>Jetzt beginnt der kurze übungsdurchlauf.</p>
    <p>Bitte folge den Hinweisen bei jedem Wort genau.</p>
  `,
  practice_tr: `
    <p>Simdi kisa deneme turu basliyor.</p>
    <p>Lutfen her kelimede verilen isaretleri dikkatle takip et.</p>
  `,
  start_main_de: `
    <p>Dein richtiger Lerndurchlauf geht jetzt los.</p>
    <p>Dir werden wieder einzelne Wörter (Deutsch oder Türkisch) präsentiert.</p>
    <p>Danach zeigt ein Symbol an, ob du das Wort merken oder vergessen sollst.</p>
    <p>Rotes Kreuz ❌ = vergessen, grüner Haken ✅ = erinnern.</p>
  `,
  start_main_tr: `
    <p>Asil ogrenme dongusu simdi basliyor.</p>
    <p>Sana yeniden tek tek kelimeler (Almanca veya Turkce) sunulacak.</p>
    <p>Ardindan gelen isaret, kelimeyi hatirlaman mi yoksa unutman mi gerektigini gosterecek.</p>
    <p>Kirmizi carpı ❌ = unut, yesil onay ✅ = hatirla.</p>
  `,
  recognition_de: `
    <p>Du hast es geschafft, dein Lerndurchgang ist nun abgeschlossen.</p>
    <p>Im Anschluss folgt ein Recognition-Test. Dabei werden dir einzelne Wörter gezeigt, und du gibst für jedes Wort an, ob es ein altes Wort (aus dem Lerndurchgang) oder ein neüs Wort ist.</p>
    <p><strong>Wichtig:</strong> Alle Wörter aus dem Lerndurchgang gelten als alte Wörter, auch die, die du vergessen solltest. Versuche daher, dich an alle zu erinnern.</p>
    <p>Drücke <strong>F</strong> für "Alt" und <strong>J</strong> für "Neu".</p>
  `,
  recognition_tr: `
    <p>Kelime ogrenme dongusu tamamlandi.</p>
    <p>Simdi bir recognition (tanima) testi olacak. Kelimeler tek tek gosterilecek ve her kelime icin bunun eski bir kelime mi (ogrenme dongusunda daha once gorulmus) yoksa yeni bir kelime mi oldugunu belirtmen gerekecek.</p>
    <p><strong>Onemli:</strong> Onceki bolumde gordugun tum kelimeler, unutman istenenler dahil, eski kelime olarak kabul edilir. Bu nedenle lutfen daha once gordugun tum kelimeleri hatirlamaya calis.</p>
    <p>"Eski" icin <strong>F</strong>, "Yeni" icin <strong>J</strong> tusuna bas.</p>
  `,
  distractor_de: `
    <p>Bitte tippen Sie so viele US-Bundesstaaten ein, wie Ihnen einfallen, und bestätigen Sie jeden mit Enter.</p>
  `,
  distractor_tr: `
    <p>Lütfen aklınıza gelen tüm ABD eyaletlerini yazın ve her birini Enter ile onaylayın.</p>
  `,
  end_de: `
    <p>Vielen Dank für Ihre Teilnahme!</p>
    <p>Sie können das Browserfenster nun schliessen.</p>
  `,
  end_tr: `
    <p>Katiliminiz icin tesekkurler!</p>
    <p>Tarayici penceresini kapatabilirsiniz.</p>
  `,
  ineligible_de: `
    <p>Vielen Dank für Ihr Interesse.</p>
    <p>Basierend auf den Angaben gehören Sie leider nicht zur Zielgruppe dieser Studie.</p>
  `,
  ineligible_tr: `
    <p>Ilginiz icin tesekkurler.</p>
    <p>Verdiginiz bilgilere gore bu calismanin hedef grubuna uymuyorsunuz.</p>
  `,
};
