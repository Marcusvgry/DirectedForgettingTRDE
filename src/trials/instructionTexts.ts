import type { InstructionTexts } from "../types/d.ts";

export const instructionTexts: InstructionTexts = {
  welcome_de: `

 <p>   Sehr geehrter Teilnehmer, sehr geehrte Teilnehmerin, </p>

<p> Vielen Dank für deine Teilnahme an dieser Studie. Im Folgenden bitten wir dich erst einige Fragen zu dir und deinem alltäglichen Sprachgebrauch zu beantworten. Anschließend wirst du immer einzelne Worte (Deutsch oder Türkisch) gezeigt bekommen, die du entweder erinnern oder vergessen sollst. Die Teilnahme ist freiwillig und du kannst jeder Zeit das Experiment ohne Angabe von Gründen abbrechen, und deine Daten werden gelöscht. Die Daten werden anonymisiert erfasst, sodass sie nach Abschluss des Experiments nicht mehr auf deine Person zurückgeführt werden können und sie werden ausschließlich zu Forschungszwecken genutzt. Wir bitten daher zu jedem Zeitpunkt der Studie so ehrlich und genau wie möglich zu antworten, damit die Ergebnisse am Ende nicht verfälscht werden. </p>

  `,

  welcome_tr: ` 

<p>Sayın katılımcı, </p>

<p> Bu çalışmaya katıldığın için teşekkür ederiz. Önce senden, kendin ve günlük dil kullanımınla ilgili bazı soruları yanıtlamanı isteyeceğiz. Ardından sana tek tek kelimeler (Almanca veya Türkçe) sunulacak, bu kelimeleri ya hatırlaman ya da unutman gerekecek. Katılım gönüllüdür. İstediğin zaman, gerekçe belirtmeden deneyi sonlandırabilirsin; bu durumda verilerin silinecektir. Veriler anonim olarak kaydedilmektedir, bu sayede deneyin tamamlanmasının ardından artık seninle ilişkilendirilemez ve yalnızca bilimsel araştırma amacıyla kullanılır. Bu nedenle, sonuçların çarpıtılmaması için çalışma boyunca olduğunca dürüst ve doğru cevaplar vermeni rica ederiz.  </p>

    `,

  general_de: `

    <p>Bevor es richtig los geht, wirst du einen kurzen Übungsdurchlauf machen, um dich mit der Aufgabe vertraut zu machen. Dir werden immer einzelne Wörter – entweder auf Deutsch oder auf Türkisch – präsentiert. Darauf wird ein Hinweissymbol folgen, welches dir angibt, ob du dir das gerade gelesene Wort merken, oder ob du es vergessen sollst. Ein rotes Kreuz ❌ bedeutet, dass du es vergessen, ein grüner Haken ✅, dass du es erinnern sollst.</p>

  `,

  general_tr: `

    <p>Asıl görev başlamadan önce, göreve alışman için kısa bir alıştırma turu yapacaksın. Sana her seferinde tek tek kelimeler – ya Almanca ya Türkçe – gösterilecek. Bunun ardından, az önce okuduğun kelimeyi hatırlaman mı yoksa unutman mı gerektiğini belirten bir işaret gösterilecek. Kırmızı çarpı ❌ kelimeyi unutman gerektiğini, yeşil tik ✅ ise hatırlaman gerektiğini gösterir.  </p>

  `,

  practice_recognition_de: `

    <p>Nun folgt ein kurzer Recognition Test. Dabei werden dir einzelne Wörter gezeigt, und du musst für jedes Wort angeben, ob es sich um ein zu erinnerndes Wort aus deinem Lerndurchgang handelt, oder um ein neues, unbekanntes Wort.</p>

    <p>Drücke <strong>F</strong> für „Alt“ und <strong>J</strong> für „Neu“.</p>

  `,

  practice_recognition_tr: `

    <p>Şimdi kısa bir tanıma (recognition) testi yapılacaktır. Bu testte sana tek tek kelimeler gösterilecek ve her kelime için bunun öğrenme aşamasında hatırlaman gereken bir kelime mi, yoksa yeni ve bilinmeyen bir kelime mi olduğunu belirtmen istenecek.</p>

    <p>"Eski" için <strong>F</strong>, "Yeni" için <strong>J</strong> tuşuna bas.</p>

  `,

  start_main_de: `

   <p> Dein richtiger Lerndurchlauf geht jetzt los! </p>

 <p> Dir werden jetzt wieder einzelne Wörter – entweder auf Deutsch oder auf Türkisch – präsentiert. Darauf wird ein Hinweissymbol folgen, welches dir angibt, ob du dir das gerade gelesene Wort merken, oder ob du es vergessen sollst. Ein rotes Kreuz ❌ bedeutet, dass du es vergessen, ein grüner Haken ✅, dass du es erinnern sollst. </p>

  `,

  start_main_tr: `

    <p> Asıl öğrenme turu şimdi başlıyor!</p>

    <p>Sana şimdi tekrardan tek tek kelimeler – ya Almanca ya Türkçe – gösterilecek. Bunun ardından, az önce okuduğun kelimeyi hatırlaman mı yoksa unutman mı gerektiğini belirten bir işaret gösterilecek. Kırmızı çarpı  ❌ kelimeyi unutman gerektiğini, yeşil tik ✅ ise hatırlaman gerektiğini gösterir. </p>

  `,

  recognition_de: `

   <p>Du hast es geschafft, dein Lerndurchgang ist nun abgeschlossen! Im Anschluss folgt ein Recognition Test. Dabei werden dir einzelne Wörter gezeigt, und du musst für jedes Wort angeben, ob es sich um ein altes Wort handelt, also eins, aus deinem Lerndurchgang, oder um ein neues Wort.</p>

</p><strong>Dabei gelten alle Wörter des Lerndurchgangs als alte Wörter, auch die, die du vergessen solltest. Versuche bitte jetzt alle zu erinnern.</strong></p>

    <p>Drücke <strong>F</strong> für "Alt" und <strong>J</strong> für "Neu".</p>

  `,

  recognition_tr: `

    <p> Öğrenme aşamasını başarıyla tamamladın! Şimdi bir tanıma (recognition) testi başlayacak. Bu aşamada sana tek tek kelimeler gösterilecek ve her kelime için bunun eski bir kelime mi (yani öğrenme aşamasında gördüğün bir kelime mi) yoksa yeni bir kelime mi olduğunu belirtmen gerekecek. </p>

    <p> <strong>Bu testte, öğrenme aşamasındaki tüm kelimeler (unutman gerekenler dahil) “eski” olarak Kabul edilir. Lütfen şimdi hepsini hatırlamaya çalış.</strong></p>

    <p>"Eski" için <strong>F</strong>, "Yeni" için <strong>J</strong> tuşuna bas.</p>

  `,

  distractor_de: `

    <p>Du hast nun eine Minute Zeit, so viele US-Bundesstaaten einzugeben wie dir einfallen. Bitte tippe die Staaten jeweils einzeln in das Fenster und drücke dann nach jeder Eingabe die Enter-Taste.</p>

  `,

  distractor_tr: `

    <p>Şimdi aklına geldiği kadar mümkün olduğunca çok ABD eyaletini yazman için bir dakikan var. Lütfen eyaletleri tek tek yaz ve her girişten sonra Enter tuşuna bas. </p>

  `,

  end_de: `

    <p>Vielen Dank für deine Teilnahme! </p>

<p> Wir bitten dich, über diese Studie nicht mit anderen Personen zu sprechen, die noch nicht daran teilgenommen haben, und vielleicht noch teilnehmen werden. Dadurch wird verhindert, dass die Ergebnisse verfälscht werden. </p>

<p> Danke für dein Verständnis und deine Kooperation!</p>

  `,

  end_tr: `

    <p>Katılımın için çok teşekkür ederiz!</p>

    <p>Bu çalışma hakkında çalışmamıza henüz katılmamış ve belki ileride katılacak olan kişilerle konuşmamanı rica ederiz.  Bu sayede sonuçların çarpıtılmasının önüne geçilmiş olur.</p>

<p>Anlayışın ve iş birliğin için teşekkür ederiz! </p>

  `,
  ineligible_de: `
    <p>Vielen Dank für dein Interesse.</p>
    <p>Es haben schon genug monolinguale Personen teilgenommen, sodass wir leider nur noch nach bilingualen Teilnehmern suchen.</p>
  `,
  ineligible_tr: `
    <p>Ilginiz icin tesekkurler.</p>
    <p>Bu calisma su anda yalnizca Almanca ve Turkce konusan iki dilli kisilere aciktir. Verdiginiz bilgilere gore bu calismanin hedef grubuna uymuyorsunuz.</p>
  `,
};
