import type { InstructionTexts } from "../types/d.ts";

export const instructionTexts: InstructionTexts = {
  welcome_de: `
    Sehr geehrter Teilnehmer, sehr geehrte Teilnehmerin,
Vielen Dank für deine Teilnahme an dieser Studie. Im Folgenden bitten wir dich erst einige Fragen zu dir und deinem alltäglichen Sprachgebrauch zu beantworten. Anschließend wirst du immer einzelne Worte (Deutsch oder Türkisch) gezeigt bekommen, die du entweder erinnern oder vergessen sollst. Die Teilnahme ist freiwillig und du kannst jeder Zeit das Experiment ohne Angabe von Gründen abbrechen, und deine Daten werden gelöscht. Die Daten werden anonymisiert erfasst, sodass sie nach Abschluss des Experiments nicht mehr auf deine Person zurückgeführt werden können und sie werden ausschließlich zu Forschungszwecken genutzt. Wir bitten daher zu jedem Zeitpunkt der Studie so ehrlich und genau wie möglich zu antworten, damit die Ergebnisse am Ende nicht verfälscht werden.
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
  general_de: `
    <p>Bevor es richtig los geht, wirst du einen kurzen Übungsdurchlauf machen, um dich mit der Aufgabe vertraut zu machen. Dir werden immer einzelne Wörter – entweder auf Deutsch oder auf Türkisch – präsentiert. Darauf wird ein Hinweissymbol folgen, welches dir angibt, ob du dir das gerade gelesene Wort merken, oder ob du es vergessen sollst. Ein rotes Kreuz ❌ bedeutet, dass du es vergessen, ein grüner Haken ✅, dass du es erinnern sollst.</p>
  `,
  general_tr: `
    <p>Deney asamasina gecmeden once, goreve alisman icin kisa bir deneme turu yapacaksin.</p>
    <p>Sana tek tek kelimeler (Almanca veya Turkce) sunulacak.</p>
    <p>Hemen ardindan, kelimeyi hatirlaman mi yoksa unutman mi gerektigini gosteren bir isaret cikacak.</p>
    <p>Kirmizi carpı ❌: unut. Yesil onay ✅: hatirla.</p>
  `,
  practice_de: `
    <p>Jetzt beginnt der kurze Übungsdurchlauf.</p>
  `,
  practice_tr: `
    <p>Simdi kisa deneme turu basliyor.</p>
  `,
  practice_recognition_de: `
    <p>Nun folgt ein kurzer Recognition Test. Dabei werden dir einzelne Wörter gezeigt, und du musst für jedes Wort angeben, ob es sich um ein zu erinnerndes Wort aus deinem Lerndurchgang handelt, oder um ein neues, unbekanntes Wort.</p>
    <p>Drücke <strong>F</strong> für „Alt“ und <strong>J</strong> für „Neu“.</p>
  `,
  practice_recognition_tr: `
    <p>Simdi kisa bir recognition testi olacak. Sana tek tek kelimeler gosterilecek ve her kelime icin bunun ogrenme dongunden hatirlaman gereken bir kelime mi, yoksa yeni ve bilinmeyen bir kelime mi oldugunu belirtmen gerekiyor.</p>
    <p>"Eski" icin <strong>F</strong>, "Yeni" icin <strong>J</strong> tusuna bas.</p>
  `,
  start_main_de: `
    Dein richtiger Lerndurchlauf geht jetzt los!
Dir werden jetzt wieder einzelne Wörter – entweder auf Deutsch oder auf Türkisch – präsentiert. Darauf wird ein Hinweissymbol folgen, welches dir angibt, ob du dir das gerade gelesene Wort merken, oder ob du es vergessen sollst. Ein rotes Kreuz ❌ bedeutet, dass du es vergessen, ein grüner Haken ✅, dass du es erinnern sollst.
  `,
  start_main_tr: `
    <p>Asil ogrenme dongusu simdi basliyor.</p>
    <p>Sana yeniden tek tek kelimeler (Almanca veya Turkce) sunulacak.</p>
    <p>Ardindan gelen isaret, kelimeyi hatirlaman mi yoksa unutman mi gerektigini gosterecek.</p>
    <p>Kirmizi carpı ❌ = unut, yesil onay ✅ = hatirla.</p>
  `,
  recognition_de: `
    Du hast es geschafft, dein Lerndurchgang ist nun abgeschlossen! Im Anschluss folgt ein Recognition Test. Dabei werden dir einzelne Wörter gezeigt, und du musst für jedes Wort angeben, ob es sich um ein altes Wort handelt, also eins, aus deinem Lerndurchgang, oder um ein neues Wort.
Dabei gelten alle Wörter des Lerndurchgangs als alte Wörter, auch die, die du vergessen solltest. Versuche bitte jetzt alle zu erinnern.
    <p>Drücke <strong>F</strong> fuer "Alt" und <strong>J</strong> fuer "Neu".</p>
  `,
  recognition_tr: `
    <p>Kelime ogrenme dongusu tamamlandi.</p>
    <p>Simdi bir recognition (tanima) testi olacak. Kelimeler tek tek gosterilecek ve her kelime icin bunun eski bir kelime mi (ogrenme dongusunda daha once gorulmus) yoksa yeni bir kelime mi oldugunu belirtmen gerekecek.</p>
    <p><strong>Onemli:</strong> Onceki bolumde gordugun tum kelimeler, unutman istenenler dahil, eski kelime olarak kabul edilir. Bu nedenle lutfen daha once gordugun tum kelimeleri hatirlamaya calis.</p>
    <p>"Eski" icin <strong>F</strong>, "Yeni" icin <strong>J</strong> tusuna bas.</p>
  `,
  distractor_de: `
    <p>Bitte tippen Sie so viele US-Bundesstaaten wie moeglich.</p>
  `,
  distractor_tr: `
    <p>Ara gorev: 1 dakikaniz var.</p>
    <p>Lutfen bildiginiz kadar ABD eyaletini yaziniz.</p>
  `,
  end_de: `
    <p>Vielen Dank für deine Teilnahme!
Wir bitten dich, über diese Studie nicht mit Mitschülern oder Mitschülerinnen zu sprechen, die noch nicht daran teilgenommen haben, und vielleicht noch teilnehmen werden. Dadurch wird verhindert, dass die Ergebnisse verfälscht werden.
Danke für dein Verständnis und deine Kooperation!</p>
  `,
  end_tr: `
    <p>Katiliminiz icin tesekkurler!</p>
    <p>Tarayici penceresini kapatabilirsiniz.</p>
  `,
  ineligible_de: `
    <p>Vielen Dank für dein Interesse.</p>
    <p>Basierend auf den Angaben gehörtst du leider nicht zur Zielgruppe dieser Studie.</p>
  `,
  ineligible_tr: `
    <p>Ilginiz icin tesekkurler.</p>
    <p>Verdiginiz bilgilere gore bu calismanin hedef grubuna uymuyorsunuz.</p>
  `,
};
