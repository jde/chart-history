var chartHistory = (function () {

    var marketsChart, indicatorsChart, play;

    var currentStory = 0;
    var stories = [
        {
            'title': 'Lorem Ipsum 1',
            'description': 'Delorit morelorit adipici congomorite et ist algothon quintomolous',
            'img': 'http://upload.wikimedia.org/wikipedia/commons/4/48/Control-flow-sample.svg',
            'start': 1998,
            'end': 1999,
            'markets': [5, 4],
            'indicators': [3]
        },
        {
            'title': 'Lorem Ipsum 2',
            'description': 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numqua',
            'img': 'http://www.qualtrics.com/blog/wp-content/uploads/2010/04/calculate-sample-size.jpg',
            'start': 1999,
            'end': 2002,
            'markets': [1, 3],
            'indicators': [2, 3]
        },
        {
            'title': 'Lorem Ipsum 3',
            'description': 'one voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae con',
            'img': 'http://www.qualtrics.com/blog/wp-content/uploads/2010/10/probability-sampling.jpg',
            'start': 2002,
            'end': 2003,
            'markets': [1, 2, 3],
            'indicators': [2, 3]
        },
        {
            'title': 'Lorem Ipsum 4',
            'description': 'one voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae con',
            'img': 'http://images.all-free-download.com/images/graphicmedium/go_medias_sample_vector_pack_2_119602.jpg',
            'start': 2008,
            'end': 2011,
            'markets': [2, 3],
            'indicators': [0, 1]
        }
    ];

    var marketOptions = {
        title: {
            text: 'Volume traded on Capital Markets by Year',
            x: -20 //center
        },
        subtitle: {
            text: 'Source: SIFMA',
            x: -20
        },
        xAxis: {},
        yAxis: {
            title: "Volume (in trillions of $)",
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        series: [],
        legend: {
            layout: 'vertical',
            align: 'left',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        credits: {
            enabled: false
        }
    };

    var indicatorOptions = {
        title: {
            text: 'Indicators',
            x: -20 //center
        },
        subtitle: {
            text: 'Source: SIFMA',
            x: -20
        },
        xAxis: {},
        yAxis: {
            title: "",
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        series: [],
        legend: {
            layout: 'vertical',
            align: 'left',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        credits: {
            enabled: false
        }
    };

    var drawCharts = function() {

        // looks odd, but this is how you create the chart
        // then get a reference to the object

        $('#markets').highcharts(marketOptions);
        marketsChart = $('#markets').highcharts();

        $('#indicators').highcharts(indicatorOptions);
        indicatorsChart = $('#indicators').highcharts();

    };

    // toggles on and off a chart's serieses via an array
    var toggleSeries = function (chart, serieses) {

        for (i = 0; i < chart.series.length; i++) {
            if (serieses.indexOf(i) >= 0) {
                chart.series[i].show();
            } else {
                chart.series[i].hide();
            }
        }

    };

    var showPlotBands = function (chart, id) {

        var a;

        for (var i = 0; i < stories.length; i++) {

            if (i === id) {
                chart.xAxis[0].addPlotBand({
                    from: stories[i].start - 1996,
                    to: stories[i].end - 1996,
                    color: 'rgba(25, 10, 18, .2)',
                    id: 'pb' + stories[i].start + stories[i].end
                });
            } else {
                chart.xAxis[0].removePlotBand('pb' + stories[i].start + stories[i].end);
            }


        }

    };

    var drawTitles = function () {

        for (var i = 0; i < stories.length; i++) {
            stories[i].id = i;
            $("#titles").append(_.template($('#title').html(), stories[i]));
        }

    };

    var selectTitle = function (id) {

        for (var i = 0; i < stories.length; i++) {
            if (i === id) {
                $("#t" + i).addClass("selected");
            } else {
                $("#t" + i).removeClass("selected");
            }
        }

    };

    var drawStories = function () {

        for (var i = 0; i < stories.length; i++) {
            stories[i].id = i;
            $("#stories").append(_.template($('#story').html(), stories[i]));
        }

    };

    var showStory = function (id) {

        var i, story = stories[id];

        selectTitle(id);

        toggleSeries(marketsChart, story.markets);
        toggleSeries(indicatorsChart, story.indicators);

        showPlotBands(marketsChart, currentStory);
        showPlotBands(indicatorsChart, currentStory);


    };

    var nextStory = function () {

        currentStory++;
        currentStory = currentStory % stories.length;

        showStory(currentStory);

        $("#stories").scrollTo($("#s" + currentStory), 1000);

    };

    var lastStory = function () {

        currentStory--;
        currentStory = currentStory % stories.length;

        showStory(currentStory);

        $("#stories").scrollTo($("#s" + currentStory), 1000);

    };

    var start = function() {
        play = setInterval(nextStory, 3000);
    };

    var stop = function () {
        clearInterval(play);
    };

    var startStop = function () {
        if (play) {
            stop();
        } else {
            start();
        }
    };

    // transform a value dataset into a % change dataset
    var fluxify = function(data) {

        var out, lines = data.split('\n');

        $.each(lines, function(lineNo, line) {

            if (lineNo !== 0) {

                var items = line.split(',');

                // we need to shift off the header so we can parseFloat() the rest
                var header = items.shift();
                items = _.map(items, function (i) {return parseFloat(i.replace("$", ""));});

                var outItems = [header, 0];

                for (i = 1; i < items.length; i++) {
                    if (items[i-1] > items[i]) {
                        outItems.push(((1 - (items[i]/items[i-1])) * -100).toPrecision(3));
                    } else {
                        outItems.push(((1 - (items[i-1]/items[i])) * 100).toPrecision(3));
                    }
                }

                out += outItems.join() + "\n";

            } else {
                out += line + "\n";
            }

        });
        return out;
    };

    var parseData = function(data, options) {

        var lines = data.split('\n');
        // Iterate over the lines and add categories or series
        $.each(lines, function(lineNo, line) {

            var items = line.split(',');

            // for the first line of the csv
            if (lineNo === 0) {

                // ditch col 1, which is blank
                items.shift();

                // the rest are the years
//                options.xAxis.categories = _.map(items, function (d) {return Date.UTC(start, 0, 0); });
                options.xAxis.categories = items;

            } else {

                // for each row, add a series name the value of col 1
                options.series.push({
                    name: items.shift(),
                    data: _.map(items, function (i) {return parseFloat(i.replace("$", ""));})
                });

            }


        });
    };
    
    var loader = function () {
        async.parallel(
            [
                function (callback) {
                    $.get('markets.csv', function (data) {
                        parseData(data, marketOptions);
                        callback(null);
                    });
                },
                function (callback) {
                    $.get('indicators.csv', function (data) {
                        data = fluxify(data);
                        parseData(data, indicatorOptions);
                        callback(null);
                    });
                }
            ],
            function () {
                drawCharts();
                drawStories();
                drawTitles();
                showStory(0);
                start();
            }
        );

    }();

    return {
        nextStory: nextStory,
        lastStory: lastStory,
        startStop: startStop
    };

}());