'use strict';

/**
 * @ngdoc directive
 * @name lightPaintApp.directive:gridPaint
 * @description
 * # gridPaint
 */
angular.module('lightPaintApp')
  .directive('gridPaint', function () {
    return {
      scope: {
        board: '=?',
        boardHeight: '=?',
        boardWidth: '=?',
        row: '=?',
        column: '=?',
      },
      template: '<canvas ng-style="canvasSize"></canvas>',
      restrict: 'E',
      replace: true,
      link: function postLink(scope, element, attrs) {

        scope.$watch('row', function (newVal) {

          initData();
          drawBoard();
        });

        scope.$watch('column', function (newVal) {

          initData();
          drawBoard();
        });

        scope.$watch('boardWidth', function (newVal) {

          initData();
          drawBoard();
        });

        scope.$watch('boardHeight', function (newVal) {

          initData();
          drawBoard();
        });

        var rowWidth;
        var rowHeight;
        var canvas = element[0];
        var context = canvas.getContext("2d");
        canvas.addEventListener("click", onGridClick, false);

        function initBoard () {
          var x = new Array(scope.column);
          for (var i = 0; i < scope.column; i++) {
            x[i] = new Array(scope.row);
            for (var j = 0; j < scope.row; j++) {

              x[i][j] = {};
              x[i][j].isClick = false;
              x[i][j].cell = new Cell(i, j);

            };
          }

          return x;
        }

        function Cell(row, column) {
            this.row = row;
            this.column = column;
        }

        function getCursorPosition(e) {
            /* returns Cell with .row and .column properties */
            var x;
            var y;
            if (e.pageX != undefined && e.pageY != undefined) {
              x = e.pageX;
              y = e.pageY;
            }
            else {
              x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
              y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
            }

            x -= canvas.offsetLeft;
            y -= canvas.offsetTop;
            x = Math.min(x, scope.boardWidth * rowWidth);
            y = Math.min(y, scope.boardHeight * rowHeight);

            var cell = new Cell(Math.floor(y/rowHeight), Math.floor(x/rowWidth));
            return cell;
        }

        function onGridClick (e) {
          var cell = getCursorPosition(e);
          console.log(cell);
          
          for (var i = 0; i < scope.column; i++) {
            for (var j = 0; j < scope.row; j++) {
              if (cell.row == scope.board[i][j].cell.row && cell.column == scope.board[i][j].cell.column) {

                scope.board[i][j].isClick = !scope.board[i][j].isClick;

              }
            }
          }

          scope.$apply();          
          drawBoard();

        }

        function drawPiece(piece, selected) {
          var p = piece.cell;
          var column = p.column;
          var row = p.row;
          var x = (column * rowWidth) + (rowWidth/2);
          var y = (row * rowHeight) + (rowHeight/2);
          var radius = (rowWidth/2) - (rowHeight/10);
          
          if (scope.row > scope.column) {
            radius = (rowWidth/2) - (rowHeight/10);
          } 
          else {
            radius = (rowHeight/2) - (rowWidth/10);
          }

          if (piece.isClick) {
            context.beginPath();
            context.arc(x, y, radius, 0, Math.PI*2, false);
            context.fill();
            context.fillStyle = "#000";
            context.stroke();
          }
        }

        function initData () {

          scope.boardWidth = scope.boardWidth || 400;
          scope.boardHeight = scope.boardHeight || 400;
          scope.column = scope.column || 10;
          scope.row = scope.row || 10;
          scope.canvasSize = {'height' : scope.boardHeight + scope.row * 0.5, 'width' : scope.boardWidth + scope.column * 0.5};
          scope.board = initBoard();

          canvas.width = scope.boardWidth + scope.row * 0.5;
          canvas.height = scope.boardHeight + scope.column * 0.5;

          rowWidth = scope.boardWidth / scope.row;
          rowHeight = scope.boardHeight / scope.column;

        }

        function drawBoard() {

          context.clearRect(0, 0, scope.boardWidth, scope.boardHeight);

          context.beginPath();

          for (var x = 0; x <= scope.boardWidth; x += rowWidth) {
              context.moveTo(0.5 + x, 0);
              context.lineTo(0.5 + x, scope.boardHeight);
          }


          for (var y = 0; y <= scope.boardHeight; y += rowHeight) {
              context.moveTo(0, 0.5 + y);
              context.lineTo(scope.boardWidth, 0.5 + y);
          }

          context.strokeStyle = "black";
          context.stroke();

          for (var i = 0; i < scope.column; i++) {
            for (var j = 0; j < scope.row; j++) {
              drawPiece(scope.board[i][j]);
            }
          }


        }

        initData();
        drawBoard();

      }
    };
  });
