/* 

This file grabs historical bitcoin price data from CoinDesk API 
  when the user chooses dates to get data for.

*/

window.histPriceData = {};

//query CoinDesk API for data, render data in historical data component
//this is called when user clicks on component
var getHistoricalPriceData = function(){
  $.ajax({
      url: 'http(s)://api.coindesk.com/v1/bpi/currentprice.json',
      method: 'GET',
      success: (data) => {
        var histData = JSON.parse(data);
        $('histData').empty();
        $('.histData').append('<h3 class="text-center">Historical Bitcoin Prices</h3><br>');
        $('.histData').append('<div>' + histData + '</div>');
      },
      error: (error) => console.log('An error occurred while trying to get historical data: ', error);
    });
}

//Adds it to the window
window.getHistoricalPriceData = getHistoricalPriceData;

