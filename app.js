// 데이터 링크
link = 'https://api.thingspeak.com/channels/575240/feeds.json?api_key=VCSZ7S7QTJ49A1FN&results=2';

// 전기사용량, 전기요금, 탄소배출량 총합
esum = 0, bsum = 0, csum = 0;
// 제품번호 배열
product = new Array();

// 15초에 한 번 데이터 링크 로드
check = setInterval(function(event){
    $('#check').load(link, function(data){
        // json으로 data불러오기
        var obj = JSON.parse(data);
        
        // 태그, 열린 시간 불러오기
        tag = parseFloat(obj["feeds"][0][5]);
        time = parseFloat(obj["feeds"][0][6]); 

        // 총합 계산
        esum += time.toFixed(2);
        bsum += (time * 0.004).toFixed(2);
        csum += (time * 4.24).toFixed(2);

        // check.html에 추가
        $('#section-list #elec').append("<div class='info middle'>총 사용량 : " + esum + "Wh</div>");
        $('#section-list #Bill').append("<div class='info middle'>총 요금 : " + bsum + "원</div>");
        $('#section-list #Cb').append("<div class='info middle'>총 배출량 : " + csum + "TC</div>");
        $('#section-list #time').append("<div class='info middle'>열린 시간: " + time + "초</div>");

        // 제품 배열 확인하고 check.html에 추가
        if(checkProduct(tag) == 1)
        {
            product.append(tag);
            $('#section-list #rfid').append("<div class='info middle'>" + tag + "번 제품이 냉장고 안에 들어갔습니다.</div>");
        }
        else if(checkProduct(tag) == -1)
            $('#section-list #rfid').append("<div class='info middle'>" + tag + "번 제품이 냉장고 밖으로 나갔습니다.</div>");
        else
            $('#section-list #rfid').append("<div class='info middle'>냉장고 안에 아무 제품도 들어있지 않습니다.</div>");
    });
}, 15000);

remove = setInterval(function(event){
    $('#section-list .info').remove();
    esum = 0, bsum = 0, csum = 0, time = 0;
}, 45000);

// 그래프 삽입
$('#temp .graph').append("<iframe width='450' height='260' style='border: 1px solid #cccccc;' src='https://thingspeak.com/channels/575240/charts/1?bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=60&type=line&update=15'></iframe>");
$('#mois .graph').append("<iframe width='450' height='260' style='border: 1px solid #cccccc;' src='https://thingspeak.com/channels/575240/charts/2?bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=60&type=line&update=15'></iframe>");
$('#oxy .graph').append("<iframe width='450' height='260' style='border: 1px solid #cccccc;' src='https://thingspeak.com/channels/575240/charts/3?bgcolor=%23ffffff&color=%23d62020&dynamic=true&results=60&type=line&update=15'></iframe>");

//상품 중복 확인
function checkProduct(value)
{
    if(product.length == 0)
        return 0;
    for(i = 0; i < product.length; i++)
    {
        if(value == product[i]) 
            return -1;
    }
    return 1;
}

// 체험하기
$('#section-check button').on("click", function(event){
    window.location = 'check.html';
});

// 한영 번역
var num = 0;
$('#lan').on("click", function(event){
    if(num%2)
    {
        $(this).html("English");
        $('.kor').show();
        $('.en').hide();
    }
    else
    {
        $(this).html("한국어");
        $('.kor').hide();
        $('.en').show();
    }
    num++;
});

// 개발방법 더 알아보기
$('#section-what p').on("click", function(event){
    window.location = 'code.html';
});