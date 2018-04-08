'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var TEXT_WIDTH = 200;
var BAR_HEIGHT = 40;
var MAX_HEIGHT = 150;
var COLUMN_WIDTH = 40;
var SKIP_WIDTH = 50;
var barHeight = CLOUD_Y + CLOUD_HEIGHT - BAR_HEIGHT;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];
  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

window.renderStatistics = function (ctx, names, times) {

  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.font = '16px PT Mono';
  ctx.fillStyle = '#000';
  ctx.fillText('Ура вы победили!', CLOUD_X + (CLOUD_WIDTH - TEXT_WIDTH) / 2, CLOUD_Y + 2 * GAP);
  ctx.fillText('Список результатов:', CLOUD_X + (CLOUD_WIDTH - TEXT_WIDTH) / 2, CLOUD_Y + BAR_HEIGHT);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    ctx.fillStyle = '#000';
    ctx.fillText(names[i], CLOUD_X + 5 * GAP + (COLUMN_WIDTH + SKIP_WIDTH) * i, barHeight + 2 * GAP);
    ctx.fillText(Math.round(times[i]), CLOUD_X + 5 * GAP + (COLUMN_WIDTH + SKIP_WIDTH) * i, barHeight - MAX_HEIGHT * Math.round(times[i]) / maxTime - GAP);

    ctx.fillStyle = (names[i] === 'Вы') ? 'rgba(255, 0, 0, 1)' : 'rgb(0, 0,' + Math.round(Math.random() * 255) + ')';
    ctx.beginPath();
    ctx.moveTo(CLOUD_X + 5 * GAP + (COLUMN_WIDTH + SKIP_WIDTH) * i, barHeight);
    ctx.lineTo(CLOUD_X + 5 * GAP + COLUMN_WIDTH + (COLUMN_WIDTH + SKIP_WIDTH) * i, barHeight);
    ctx.lineTo(CLOUD_X + 5 * GAP + COLUMN_WIDTH + (COLUMN_WIDTH + SKIP_WIDTH) * i, barHeight - MAX_HEIGHT * Math.round(times[i]) / maxTime);
    ctx.lineTo(CLOUD_X + 5 * GAP + (COLUMN_WIDTH + SKIP_WIDTH) * i, barHeight - MAX_HEIGHT * Math.round(times[i]) / maxTime);
    ctx.fill();
  }
};
