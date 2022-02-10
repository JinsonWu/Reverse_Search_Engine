//下面那行一定要寫，沒寫扣分。
"use strict";
//time:0~31格
let time = 0;
let parameter = 0;
//card_number:第幾張卡片(第card_number bit永遠是1)
for (let card_number = 0; card_number <= 5; card_number++){ 
	time = -1;//line18
	parameter = 2 ** card_number;//card_number matches the real bit directly.
	document.write('<table style="border:2px orange solid;">');//table外框
		document.write('<tr><td style="border:1px orange solid;font-weight:bold;" colspan="8">'
					 + '第 ' + String(card_number+1) + ' 張卡片' 
					 + '<input type="checkbox">'
					 + '</td></tr>');//table第一列小框 & 文字 & checkbox
		for (let line_number = 1; line_number <= 4; line_number++){
			document.write('<tr>');
			for (let column_number = 1; column_number <= 8; column_number++){
				time++;
				document.write('<td style="border:1px orange solid;">' 
							 + String(time * 2 - (time % parameter) + parameter)
							 + '</td>');//table其他小框 & 數字 
										//(00000~11111)(time)左移1bit(*2),但(time % parameter)部分不用移,故原式減去(time % parameter),之後再加上固定為1之bit之值(parameter),即可得出結果。
			}
			document.write('</tr>');	
		}
	document.write('</table>');
}
