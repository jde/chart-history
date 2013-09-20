$(function () {

    var marketsChart, indicatorsChart, play;

    var currentStory = 0;
    var stories = [
        {
            'title': 'Dot com Boom',
            'Description': 'The Dot com boom, driven by the IPO market, saw an unprecidented explosion the tech industry.  Many companies continued to shape the world we live in today.',
            'articles': [
                {
                    'title': 'Guessing The Nex Chapter of Virtual Bookselling',
                    'link': 'http://www.nytimes.com/1997/05/04/business/guessing-the-next-chapter-of-virtual-bookselling.html'
                }               
            ]
            'start': 1997,
            'end': 2000,
            'markets': [2],
            'indicators': [1]
        },
        {
            'title': 'Lorem Ipsum 2',
            'Description': 'Delorit morelorit adipici congomorite et ist algothon quintomolous',
            'start': 1999,
            'end': 2002
        },
        {
            'title': 'Lorem Ipsum 3',
            'Description': 'Delorit morelorit adipici congomorite et ist algothon quintomolous',
            'start': 2002,
            'end': 2003
        },
        {
            'title': 'Lorem Ipsum 4',
            'Description': 'Delorit morelorit adipici congomorite et ist algothon quintomolous',
            'start': 2008,
            'end': 2011
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
        }
    };

    var drawCharts = function() {

        // looks odd, but this is how you create the chart
        // then get a reference to the object

        $('#markets').highcharts(marketOptions);
        marketsChart = $('#markets').highcharts();
        $('#indicators').highcharts(indicatorOptions);
        indicatorsChart = $('#indicators').highcharts();


        showStory(0);

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

    var showPlotBand = function (chart, start, end) {

        chart.xAxis.addPlotBand = [{
            from: 0,
            to: 3,
            color: 'rgba(68, 170, 213, .2)',
            id: 'pb' + start + end
        }];

    };

    var showStory = function (id) {

        var i, story = stories[id];

        toggleSeries(marketsChart, story.markets);
        toggleSeries(indicatorsChart, story.indicators);

        showPlotBand(marketsChart, story.start, story.end);
        showPlotBand(indicatorsChart, story.start, story.end);


    };

    var nextStory = function () {

        currentStory = (currentStory++) % stories.length;

        showStory(currentStory);

        console.log(stories[currentStory]);

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
                play = setInterval(function () { console.log('hi'); }, 3000);
                play = setInterval(nextStory, 3000);
            }
        );

    }();

});