// Razonamiento/niveles/r1/r1banco.js
// Banco r1: Series numéricas (opción múltiple)
// Formato:
// { id, seq, question, options:[...], answer: index, explain }

(function () {
  "use strict";

  window.LX_R1_BANK = [
    { id:"r1q01", seq:"2, 4, 6, 8, __", question:"¿Qué número completa la serie?", options:["9","10","12","14"], answer:1, explain:"Suma +2." },
    { id:"r1q02", seq:"5, 10, 20, 40, __", question:"¿Qué número completa la serie?", options:["60","70","80","90"], answer:2, explain:"Multiplica ×2." },
    { id:"r1q03", seq:"1, 4, 9, 16, __", question:"¿Qué número completa la serie?", options:["20","25","24","36"], answer:1, explain:"Cuadrados: 1², 2², 3², 4², 5²." },
    { id:"r1q04", seq:"3, 6, 12, 24, __", question:"¿Qué número completa la serie?", options:["36","40","48","60"], answer:2, explain:"Multiplica ×2." },
    { id:"r1q05", seq:"20, 18, 16, 14, __", question:"¿Qué número completa la serie?", options:["10","11","12","13"], answer:2, explain:"Resta −2." },
    { id:"r1q06", seq:"1, 3, 6, 10, 15, __", question:"¿Qué número completa la serie?", options:["18","20","21","22"], answer:2, explain:"Suma +2,+3,+4,+5,+6. Entonces 15+6=21." },
    { id:"r1q07", seq:"2, 6, 18, 54, __", question:"¿Qué número completa la serie?", options:["108","162","216","270"], answer:1, explain:"Multiplica ×3." },
    { id:"r1q08", seq:"7, 14, 21, 28, __", question:"¿Qué número completa la serie?", options:["30","32","35","36"], answer:2, explain:"Suma +7." },
    { id:"r1q09", seq:"100, 50, 25, 12.5, __", question:"¿Qué número completa la serie?", options:["6.25","7.5","8.25","10"], answer:0, explain:"Divide entre 2." },
    { id:"r1q10", seq:"1, 2, 4, 7, 11, __", question:"¿Qué número completa la serie?", options:["14","15","16","17"], answer:2, explain:"Diferencias: +1,+2,+3,+4,+5. Entonces 11+5=16." },

    { id:"r1q11", seq:"9, 7, 8, 6, 7, 5, __", question:"¿Qué número completa la serie?", options:["4","5","6","7"], answer:2, explain:"Alterna: −2, +1. Entonces 5+1=6." },
    { id:"r1q12", seq:"4, 9, 19, 39, __", question:"¿Qué número completa la serie?", options:["59","69","79","89"], answer:2, explain:"Regla: ×2 +1. 39×2+1=79." },
    { id:"r1q13", seq:"2, 3, 5, 8, 12, __", question:"¿Qué número completa la serie?", options:["15","16","17","18"], answer:2, explain:"Diferencias: +1,+2,+3,+4,+5. Entonces 12+5=17." },
    { id:"r1q14", seq:"10, 9, 7, 4, 0, __", question:"¿Qué número completa la serie?", options:["-3","-4","-5","-6"], answer:2, explain:"Resta −1,−2,−3,−4,−5. Entonces 0−5=−5." },
    { id:"r1q15", seq:"1, 1, 2, 3, 5, 8, __", question:"¿Qué número completa la serie?", options:["11","12","13","14"], answer:2, explain:"Fibonacci: suma de los dos anteriores. 5+8=13." },
    { id:"r1q16", seq:"6, 11, 16, 21, __", question:"¿Qué número completa la serie?", options:["24","25","26","27"], answer:3, explain:"Suma +5. Entonces 21+5=26." },
    { id:"r1q17", seq:"3, 9, 27, __", question:"¿Qué número completa la serie?", options:["54","72","81","90"], answer:2, explain:"Multiplica ×3. Entonces 27×3=81." },
    { id:"r1q18", seq:"8, 13, 18, 23, __", question:"¿Qué número completa la serie?", options:["26","27","28","29"], answer:1, explain:"Suma +5. Entonces 23+5=28." },

    { id:"r1q19", seq:"2, 5, 10, 17, 26, __", question:"¿Qué número completa la serie?", options:["35","36","37","38"], answer:2, explain:"Suma impares: +3,+5,+7,+9,+11. Entonces 26+11=37." },
    { id:"r1q20", seq:"1, 2, 6, 24, __", question:"¿Qué número completa la serie?", options:["60","96","120","144"], answer:2, explain:"Factoriales: 1!,2!,3!,4!,5!=120." },
    { id:"r1q21", seq:"11, 22, 44, 88, __", question:"¿Qué número completa la serie?", options:["121","132","154","176"], answer:3, explain:"Multiplica ×2. Entonces 88×2=176." },
    { id:"r1q22", seq:"30, 27, 21, 12, __", question:"¿Qué número completa la serie?", options:["0","2","3","6"], answer:0, explain:"Resta −3,−6,−9,−12. Entonces 12−12=0." },
    { id:"r1q23", seq:"5, 6, 8, 11, 15, __", question:"¿Qué número completa la serie?", options:["18","19","20","21"], answer:2, explain:"Diferencias: +1,+2,+3,+4,+5. Entonces 15+5=20." },
    { id:"r1q24", seq:"1, 3, 7, 15, __", question:"¿Qué número completa la serie?", options:["23","29","31","33"], answer:2, explain:"Regla: ×2 +1. 15×2+1=31." },
    { id:"r1q25", seq:"12, 10, 13, 11, 14, 12, __", question:"¿Qué número completa la serie?", options:["13","14","15","16"], answer:2, explain:"Alterna −2, +3. Entonces 12+3=15." },
    { id:"r1q26", seq:"4, 8, 7, 14, 13, 26, __", question:"¿Qué número completa la serie?", options:["25","24","27","28"], answer:0, explain:"Alterna ×2, −1. Entonces 26−1=25." },
    { id:"r1q27", seq:"2, 4, 8, 16, 32, __", question:"¿Qué número completa la serie?", options:["48","56","64","72"], answer:2, explain:"Multiplica ×2. Entonces 32×2=64." },
    { id:"r1q28", seq:"9, 12, 16, 21, 27, __", question:"¿Qué número completa la serie?", options:["32","33","34","35"], answer:2, explain:"Diferencias: +3,+4,+5,+6,+7. Entonces 27+7=34." },
    { id:"r1q29", seq:"6, 5, 7, 6, 8, 7, __", question:"¿Qué número completa la serie?", options:["8","9","10","11"], answer:1, explain:"Alterna −1, +2. Entonces 7+2=9." },
    { id:"r1q30", seq:"1, 4, 10, 20, 35, __", question:"¿Qué número completa la serie?", options:["52","54","56","58"], answer:2, explain:"Suma +3,+6,+10,+15,+21. Entonces 35+21=56." },
  ];
})();
