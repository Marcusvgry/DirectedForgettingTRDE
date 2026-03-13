import type { InstructionTexts } from "../types/d.ts";

export const instructionTexts: InstructionTexts = {
  welcome_de: `
    <p>Sehr geehrte Teilnehmerin, sehr geehrter Teilnehmer,</p>
    <p>vielen Dank fuer deine Teilnahme an dieser Studie.</p>
    <p>Im Folgenden bitten wir dich, zuerst einige Fragen zu dir und deinem alltaeglichen Sprachgebrauch zu beantworten.</p>
    <p>Anschliessend werden dir einzelne Woerter (Deutsch oder Tuerkisch) gezeigt, die du entweder erinnern oder vergessen sollst.</p>
    <p>Die Teilnahme ist freiwillig und du kannst das Experiment jederzeit ohne Angabe von Gruenden abbrechen; deine Daten werden dann geloescht.</p>
    <p>Die Daten werden anonymisiert erfasst und ausschliesslich zu Forschungszwecken genutzt.</p>
    <p>Bitte antworte waehrend der gesamten Studie so ehrlich und genau wie moeglich.</p>
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
    <p>Hiermit bestaetige ich, die Informationen gelesen zu haben, und stimme der Nutzung meiner Daten zu Forschungszwecken zu.</p>
    <p>Mit "Weiter" gibst du dein Einverstaendnis zur Teilnahme.</p>
  `,
  consent_tr: `
    <p>Burada, bilgileri okudugumu ve verilerimin bu arastirma kapsaminda kullanilmasina onay verdigimi beyan ederim.</p>
    <p>"Devam" tusuna basarak katilim onayini vermis olursun.</p>
  `,
  general_de: `
    <p>Bevor es richtig losgeht, machst du einen kurzen Uebungsdurchlauf, um dich mit der Aufgabe vertraut zu machen.</p>
    <p>Dir werden einzelne Woerter (Deutsch oder Tuerkisch) praesentiert.</p>
    <p>Danach erscheint ein Hinweissymbol, das angibt, ob du das Wort merken oder vergessen sollst.</p>
    <p>Ein rotes Kreuz ❌ bedeutet: vergessen. Ein gruener Haken ✅ bedeutet: erinnern.</p>
  `,
  general_tr: `
    <p>Deney asamasina gecmeden once, goreve alisman icin kisa bir deneme turu yapacaksin.</p>
    <p>Sana tek tek kelimeler (Almanca veya Turkce) sunulacak.</p>
    <p>Hemen ardindan, kelimeyi hatirlaman mi yoksa unutman mi gerektigini gosteren bir isaret cikacak.</p>
    <p>Kirmizi carpı ❌: unut. Yesil onay ✅: hatirla.</p>
  `,
  learning_de: `
    <ul>
      <li>Ein Fixationskreuz erscheint fuer 500 ms.</li>
      <li>Das Wort erscheint fuer 4 Sekunden.</li>
      <li>Dann folgt das Hinweis-Symbol fuer 1 Sekunde.</li>
    </ul>
    <p>Gruenes Zeichen = merken, rotes X = vergessen.</p>
  `,
  learning_tr: `
    <ul>
      <li>Once bir sabitleme arti isareti 500 ms gorunur.</li>
      <li>Kelime 4 saniye gorunur.</li>
      <li>Ardindan 1 saniye sureyle isaret gorunur.</li>
    </ul>
    <p>Yesil isaret = hatirla, kirmizi X = unut.</p>
  `,
  practice_de: `
    <p>Jetzt beginnt der kurze Uebungsdurchlauf.</p>
    <p>Bitte folge den Hinweisen bei jedem Wort genau.</p>
  `,
  practice_tr: `
    <p>Simdi kisa deneme turu basliyor.</p>
    <p>Lutfen her kelimede verilen isaretleri dikkatle takip et.</p>
  `,
  start_main_de: `
    <p>Dein richtiger Lerndurchlauf geht jetzt los.</p>
    <p>Dir werden wieder einzelne Woerter (Deutsch oder Tuerkisch) praesentiert.</p>
    <p>Danach zeigt ein Symbol an, ob du das Wort merken oder vergessen sollst.</p>
    <p>Rotes Kreuz ❌ = vergessen, gruener Haken ✅ = erinnern.</p>
  `,
  start_main_tr: `
    <p>Asil ogrenme dongusu simdi basliyor.</p>
    <p>Sana yeniden tek tek kelimeler (Almanca veya Turkce) sunulacak.</p>
    <p>Ardindan gelen isaret, kelimeyi hatirlaman mi yoksa unutman mi gerektigini gosterecek.</p>
    <p>Kirmizi carpı ❌ = unut, yesil onay ✅ = hatirla.</p>
  `,
  recognition_de: `
    <p>Du hast es geschafft, dein Lerndurchgang ist nun abgeschlossen.</p>
    <p>Im Anschluss folgt ein Recognition-Test. Dabei werden dir einzelne Woerter gezeigt, und du gibst fuer jedes Wort an, ob es ein altes Wort (aus dem Lerndurchgang) oder ein neues Wort ist.</p>
    <p><strong>Wichtig:</strong> Alle Woerter aus dem Lerndurchgang gelten als alte Woerter, auch die, die du vergessen solltest. Versuche daher, dich an alle zu erinnern.</p>
    <p>Druecke <strong>F</strong> fuer "Alt" und <strong>J</strong> fuer "Neu".</p>
  `,
  recognition_tr: `
    <p>Kelime ogrenme dongusu tamamlandi.</p>
    <p>Simdi bir recognition (tanima) testi olacak. Kelimeler tek tek gosterilecek ve her kelime icin bunun eski bir kelime mi (ogrenme dongusunda daha once gorulmus) yoksa yeni bir kelime mi oldugunu belirtmen gerekecek.</p>
    <p><strong>Onemli:</strong> Onceki bolumde gordugun tum kelimeler, unutman istenenler dahil, eski kelime olarak kabul edilir. Bu nedenle lutfen daha once gordugun tum kelimeleri hatirlamaya calis.</p>
    <p>"Eski" icin <strong>F</strong>, "Yeni" icin <strong>J</strong> tusuna bas.</p>
  `,
  distractor_de: `
    <p>Zwischenaufgabe: Sie haben 1 Minute Zeit.</p>
    <p>Bitte tippen Sie so viele US-Bundesstaaten wie moeglich.</p>
  `,
  distractor_tr: `
    <p>Ara gorev: 1 dakikaniz var.</p>
    <p>Lutfen bildiginiz kadar ABD eyaletini yaziniz.</p>
  `,
  end_de: `
    <p>Vielen Dank fuer Ihre Teilnahme!</p>
    <p>Sie koennen das Browserfenster nun schliessen.</p>
  `,
  end_tr: `
    <p>Katiliminiz icin tesekkurler!</p>
    <p>Tarayici penceresini kapatabilirsiniz.</p>
  `,
  ineligible_de: `
    <p>Vielen Dank fuer Ihr Interesse.</p>
    <p>Basierend auf den Angaben gehoeren Sie leider nicht zur Zielgruppe dieser Studie.</p>
  `,
  ineligible_tr: `
    <p>Ilginiz icin tesekkurler.</p>
    <p>Verdiginiz bilgilere gore bu calismanin hedef grubuna uymuyorsunuz.</p>
  `,
};
