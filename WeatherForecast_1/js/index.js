$(function() {


	$('.search>button').on('click', function() {
		var city = $('.search>input').val();
		// 		location = text;
		// 		console.log(location);
		$('.hour_weather_list').html('');
		$('.days_weather ul').html('');
		getHours24Weather(city);
		getSevenDayWeather(city);
		$('.search>input').val('');
	});

	function getHours24Weather(city) {
		$.ajax({
			type: 'get',
			url: 'https://api.heweather.net/s6/weather/hourly',
			data: {
				location: city,
				// key: '578f18db414c484c9bb369c8a780b6e1'
				key: '3ca493c99ce24589a4d71350a2877944'
			},
			success: function(d) {
				// console.log('d ==> ', d.HeWeather6[0].hourly[0]);
				console.log(d);
				for (var i = 0; i < d.HeWeather6[0].hourly.length; i++) {
					var time = d.HeWeather6[0].hourly[i].time.substr(10);
					var day = d.HeWeather6[0].hourly[i].time.substr(8, 2);
					// console.log(day);
					var $li = $(
						`
					<li>
						<p>${day}日</p>
						<p class="hour"><span>${time}</span></p>
						<div><img src="img/天气-${d.HeWeather6[0].hourly[i].cond_txt}.png"></div>
						<p><span>${d.HeWeather6[0].hourly[i].tmp}</span><sup>₀</sup></p>
					</li>
				`
					);
					$('.hour_weather_list').append($li);
				}
			}
		})
	}



	function getSevenDayWeather(city) {
		//7天
		$.ajax({
			type: 'get',
			url: 'https://api.heweather.net/s6/weather/forecast',
			data: {
				location: city,
				// key: '578f18db414c484c9bb369c8a780b6e1'
				key: '3ca493c99ce24589a4d71350a2877944'
			},
			success: function(data) {

				var t = new Date();
				var y = toDou(t.getFullYear());
				var m = toDou(t.getMonth() + 1);
				var d = toDou(t.getDate());
				var w = t.getDay();

				//补空---->时间差空
				function toDou(n) {
					if (n < 10) {
						return '0' + n;
					} else {
						return '' + n;
					}
				};
				switch (w) {
					case 1:
						w = "一";
						break;
					case 2:
						w = "二";
						break;
					case 3:
						w = "三";
						break;
					case 4:
						w = "四";
						break;
					case 5:
						w = "五";
						break;
					case 6:
						w = "六";
						break;
					case 7:
						week = "七";
						break;
					default:
						break;
				}

				var str = y + "-" + m + "-" + d;

				// console.log(w);

				// console.log('data ==> ', data);
				// console.log(data);

				//城市
				$('.location').text(data.HeWeather6[0].basic.location);

				for (var i = 0; i < data.HeWeather6[0].daily_forecast.length; i++) {
					// console.log(data.HeWeather6[0].daily_forecast[0].date);
					if (data.HeWeather6[0].daily_forecast[i].date == str) {
						// console.log(i);
						//天气状况
						$('.today_weather').text(data.HeWeather6[0].daily_forecast[i].cond_txt_d);

						//天气图标
						$('.today_weather_img>img').attr(
							'src', 'img/天气-' + data.HeWeather6[0].daily_forecast[i].cond_txt_d + '.png'
						);

						//温度状况
						$('.tmp_min').text(data.HeWeather6[0].daily_forecast[i].tmp_min);
						$('.tmp_max').text(data.HeWeather6[0].daily_forecast[i].tmp_max);

						//星期
						$('.week').text(w);

						//年月日
						$('.month').text(m);
						$('.day').text(d);

						// console.log(data.HeWeather6[0].daily_forecast[0]);
						for (var i = 0; i < data.HeWeather6[0].daily_forecast.length; i++) {
							// var data = data.HeWeather6[0].daily_forecast[i];
							// console.log(data.HeWeather6[0].daily_forecast[i]);
							var $li = $(
								`
							<li>
								<p><span>${data.HeWeather6[0].daily_forecast[i].date.substr(5,2)}</span>/<span>${data.HeWeather6[0].daily_forecast[i].date.substr(8,2)}</span></p>
								<div><img src="img/天气-${data.HeWeather6[0].daily_forecast[i].cond_txt_d}.png"></div>
								<span class="day_status">${data.HeWeather6[0].daily_forecast[i].cond_txt_d}</span>
								<p><span>${data.HeWeather6[0].daily_forecast[i].tmp_min}</span>~<span>${data.HeWeather6[0].daily_forecast[i].tmp_max}</span><sup>₀</sup></p>
							</li>
						`
							);
							$('.days_weather>ul').append($li);

						}

					}
				}
			}
		})
	}

	// 	getHours24Weather('广州');
	// 	getSevenDayWeather('广州');

	$.ajax({
		type: 'get',
		url: 'https://apis.map.qq.com/ws/location/v1/ip',
		data: {
			// key: 'YP5BZ-T2D36-T6ASM-ELYND-WHZVS-FKFTQ',
			key: 'PXUBZ-LMW6P-LB5DY-LF6AE-XYBJ3-SKBL4',
			output: 'jsonp'
		},

		dataType: 'jsonp',

		success: function(data) {
			// console.log('data ==> ', data);
			console.log(data.result.ad_info.city);
			
			getHours24Weather(data.result.ad_info.city);
			getSevenDayWeather(data.result.ad_info.city);

		}
	})

});
