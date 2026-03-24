import type { InstructionTexts } from "../types/d.ts";

export const instructionTexts: InstructionTexts = {
  welcome_de: `
<<<<<<< Updated upstream
    <p>Sehr geehrte Teilnehmerin, sehr geehrter Teilnehmer,</p>
    <p>vielen Dank für deine Teilnahme an dieser Studie.</p>
    <p>Im Folgenden bitten wir dich, zuerst einige Fragen zu dir und deinem alltäglichen Sprachgebrauch zu beantworten.</p>
    <p>Anschliessend werden dir einzelne Wörter (Deutsch oder Türkisch) gezeigt, die du entweder erinnern oder vergessen sollst.</p>
    <p>Die Teilnahme ist freiwillig und du kannst das Experiment jederzeit ohne Angabe von Gründen abbrechen; deine Daten werden dann gelöscht.</p>
    <p>Die Daten werden anonymisiert erfasst und ausschliesslich zu Forschungszwecken genutzt.</p>
    <p>Bitte antworte während der gesamten Studie so ehrlich und genau wie möglich.</p>
=======
    Sehr geehrter Teilnehmer, sehr geehrte Teilnehmerin,
Vielen Dank für deine Teilnahme an dieser Studie. Im Folgenden bitten wir dich erst einige Fragen zu dir und deinem alltäglichen Sprachgebrauch zu beantworten. Anschließend wirst du immer einzelne Worte (Deutsch oder Türkisch) gezeigt bekommen, die du entweder erinnern oder vergessen sollst. Die Teilnahme ist freiwillig und du kannst jeder Zeit das Experiment ohne Angabe von Gründen abbrechen, und deine Daten werden gelöscht. Die Daten werden anonymisiert erfasst, sodass sie nach Abschluss des Experiments nicht mehr auf deine Person zurückgeführt werden können und sie werden ausschließlich zu Forschungszwecken genutzt. Wir bitten daher zu jedem Zeitpunkt der Studie so ehrlich und genau wie möglich zu antworten, damit die Ergebnisse am Ende nicht verfälscht werden.
>>>>>>> Stashed changes
  `,
  welcome_tr: `
    <p>Sayın katılımcı,</p>
    <p>bu çalışmaya katıldığın için teşekkür ederiz.</p>
    <p>Önce senden, kendin ve günlük dil kullanımınla ilgili bazı soruları yanıtlamanı isteyeceğiz.</p>
    <p>Ardından sana tek tek kelimeler (Almanca veya Türkçe) sunulacak, bu kelimeleri ya hatırlaman ya da unutman gerekecek.</p>
    <p>Katılım gönüllüdür. İstediğin zaman, gerekçe belirtmeden deneyi sonlandırabilirsin; bu durumda verilerin silinecektir.</p>
    <p>Veriler anonim olarak kaydedilecektir ve yalnızca bilimsel araştırma amacıyla kullanılacaktır.</p>
    <p>Bu nedenle çalışma boyunca olabildiğince dürüst ve doğru şekilde yanıt vermeni rica ederiz.</p>
  `,
<<<<<<< Updated upstream
  consent_de: `
    <p>Hiermit bestätige ich, die Informationen gelesen zu haben, und stimme der Nutzung meiner Daten zu Forschungszwecken zu.</p>
    <p>Mit "Weiter" gibst du dein Einverständnis zur Teilnahme.</p>
  `,
  consent_tr: `
    <p>Burada, bilgileri okuduğumu ve verilerimin bu araştırma kapsamında kullanılmasına onay verdiğimi beyan ederim.</p>
    <p>"Devam" tuşuna basarak katılım onayını vermiş olursun.</p>
  `,
  general_de: `
    <p>Bevor es richtig losgeht, machst du einen kurzen Übungsdurchlauf, um dich mit der Aufgabe vertraut zu machen.</p>
    <p>Dir werden einzelne Wörter (Deutsch oder Türkisch) präsentiert.</p>
    <p>Danach erscheint ein Hinweissymbol, das angibt, ob du das Wort merken oder vergessen sollst.</p>
    <p>Ein rotes Kreuz ❌ bedeutet: vergessen. Ein grüner Haken ✅ bedeutet: erinnern.</p>
  `,
  general_tr: `
    <p>Deney aşamasına geçmeden önce, göreve alışman için kısa bir deneme turu yapacaksın.</p>
    <p>Sana tek tek kelimeler (Almanca veya Türkçe) sunulacak.</p>
    <p>Hemen ardından, kelimeyi hatırlaman mi yoksa unutman mi gerektiğini gösteren bir işaret çıkacak.</p>
    <p>Kırmızı çarpı ❌: unut. Yeşil tik ✅: hatırla.</p>
  `,
  practice_de: `
    <p>Jetzt beginnt der kurze Übungsdurchlauf.</p>
    <p>Bitte folge den Hinweisen bei jedem Wort genau.</p>
  `,
  practice_tr: `
    <p>Şimdi kısa deneme turu başlıyor.</p>
    <p>Lütfen her kelimede verilen işaretleri dikkatle takip et.</p>
  `,
  start_main_de: `
    <p>Dein richtiger Lerndurchlauf geht jetzt los.</p>
    <p>Dir werden wieder einzelne Wörter (Deutsch oder Türkisch) präsentiert.</p>
    <p>Danach zeigt ein Symbol an, ob du das Wort merken oder vergessen sollst.</p>
    <p>Rotes Kreuz ❌ = vergessen, grüner Haken ✅ = erinnern.</p>
=======
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
>>>>>>> Stashed changes
  `,
  start_main_tr: `
    <p>Asıl öğrenme turu şimdi başlıyor.</p>
    <p>Sana yeniden tek tek kelimeler (Almanca veya Türkçe) sunulacak.</p>
    <p>Ardından gelen işaret, kelimeyi hatırlaman mı yoksa unutman mi gerektiğini gösterecek.</p>
    <p>Kırmızı çarpı ❌ = unut, yeşil tik ✅ = hatırla.</p>
  `,
  recognition_de: `
    <p>Du hast es geschafft, dein Lerndurchgang ist nun abgeschlossen.</p>
<<<<<<< Updated upstream
    <p>Im Anschluss folgt ein Recognition-Test. Dabei werden dir einzelne Wörter gezeigt, und du gibst für jedes Wort an, ob es ein altes Wort (aus dem Lerndurchgang) oder ein neues Wort ist.</p>
    <p><strong>Wichtig:</strong> Alle Wörter aus dem Lerndurchgang gelten als alte Wörter, auch die, die du vergessen solltest. Versuche daher, dich an alle zu erinnern.</p>
    <p>Drücke <strong>F</strong> für "Alt" und <strong>J</strong> für "Neu".</p>
=======
    <p>Im Anschluss folgt ein Recognition-Test. Dabei werden dir einzelne Woerter gezeigt, und du gibst für jedes Wort an, ob es ein altes Wort (aus dem Lerndurchgang) oder ein neues Wort ist.</p>
    <p><strong>Wichtig:</strong> Alle Wörter aus dem Lerndurchgang gelten als alte Wörter, auch die, die du vergessen solltest. Versuche daher, dich an alle zu erinnern.</p>
    <p>Drücke <strong>F</strong> fuer "Alt" und <strong>J</strong> fuer "Neu".</p>
>>>>>>> Stashed changes
  `,
  recognition_tr: `
    <p>Kelime öğrenme turu tamamlandı.</p>
    <p>Şimdi bir recognition (tanıma) testi olacak. Kelimeler tek tek gösterilecek ve her kelime için bunun eski bir kelime mi (öğrenme turunda daha önce görülmüş) yoksa yeni bir kelime mi olduğunu belirtmen gerekecek.</p>
    <p><strong>Önemli:</strong> Önceki bölümde gördüğün tüm kelimeler, unutman istenenler dahil, eski kelime olarak kabul edilir. Bu nedenle lütfen daha önce gördüğün tüm kelimeleri hatırlamaya çalış.</p>
    <p>"Eski" için <strong>F</strong>, "Yeni" için <strong>J</strong> tuşuna bas.</p>
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
    <p>Katılımınız için teşekkürler!</p>
    <p>Sekmeyi kapatabilirsiniz.</p>
  `,
  ineligible_de: `
<<<<<<< Updated upstream
    <p>Vielen Dank für Ihr Interesse.</p>
=======
    <p>Vielen Dank fuer Ihr Interesse.</p>
>>>>>>> Stashed changes
    <p>Basierend auf den Angaben gehören Sie leider nicht zur Zielgruppe dieser Studie.</p>
  `,
  ineligible_tr: `
    <p>Ilginiz icin tesekkurler.</p>
    <p>Verdiginiz bilgilere gore bu calismanin hedef grubuna uymuyorsunuz.</p>
  `,
};
