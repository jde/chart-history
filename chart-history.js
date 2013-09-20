var chartHistory = (function () {

    var marketsChart, indicatorsChart, play;

    var currentStory = 0;
    var stories = [
        {
            'title': 'Dot-Com Boom',
            'description': 'The Dot com boom, driven by the IPO market, saw an unprecidented explosion the tech industry.  Many companies continued to shape the world we live in today.',
            'articles': [
                {
                    'title': 'Guessing The Nex Chapter of Virtual Bookselling',
                    'link': 'http://www.nytimes.com/1997/05/04/business/guessing-the-next-chapter-of-virtual-bookselling.html'
                }
            ],
            'img': 'http://www.qualtrics.com/blog/wp-content/uploads/2010/04/calculate-sample-size.jpg',
            'start': 1997,
            'end': 2000,
//            'markets': [4, 5],
            'markets': [0, 1, 2, 3, 4, 5],
            'indicators': [1]
        },
        {
            'title': 'The Dot-Com Bubble Bursts',
            'description': 'After years of intensifying speculation, the IPO market lost confidence in the use of capital.  The insuing burst can be clearly seen in the IPO and secondary offering markets as well as the decline in the S&P.  We also saw a rise in Gold prices, which is a traditional reaction to market disease.',
            'articles': [
                {
                    'title': 'The Costs of Bursting Bubbles ',
                    'link': 'http://www.nytimes.com/2002/09/22/opinion/the-costs-of-bursting-bubbles.html'
                }
            ],
             'img': 'http://www.qualtrics.com/blog/wp-content/uploads/2010/04/calculate-sample-size.jpg',
            'start': 2000,
            'end': 2002,
//            'markets': [4, 5],
            'markets': [0, 1, 2, 3, 4, 5],
            'indicators': [1, 3]
        },
        {
            'title': 'Housing Boom and Credit Expansion',
            'description': 'Between 2000 and 2007 there was a rapid rise in Asset Backed market activity largely due to the Housing Boom.  During this period, many Americans were able to take out larger mortgages with lighter scrutiny on properties that were rapidly increasing in value.  As a reult, the market spiked to over $1.6 Trillion in 05 and 06 eclipsing the size of any other American market in history.  Spurred by an optimistic Fed lowering interest rates betinning in 2000, all other debt markets also saw growth during this time, as did the stock market and price of gold.',
            'articles': [
                {
                    'title': 'Unending Housing Boom tossses Aside Rate Increase the Old Rule',
                    'link': 'http://www.nytimes.com/2005/10/22/business/22charts.html?fta=y'
                },
                {
                    'title': 'Crisis Looms in Market for Mortgages',
                    'link': 'http://www.nytimes.com/2007/03/11/business/11mortgage.html?pagewanted=all'
                }
            ],
            'img': 'http://www.qualtrics.com/blog/wp-content/uploads/2010/10/probability-sampling.jpg',
            'start': 2000,
            'end': 2007,
//            'markets': [0, 1, 2, 3],
            'markets': [0, 1, 2, 3, 4, 5],
            'indicators': [0, 1, 3]
        },
        {
            'title': 'The Recovery',
            'description': 'When it became clear that the Assets that fueled the Asset Backed markets were largely based on ill advised loans on overvalued properties, the Asset Backed market crashed.  In response, the Treasury issued debt to keep the economoy on track.  In addition, the Fed cut interest rates each year, bringing the many rates to historic lows.  Unemployment rose in 2008 through 2010 before leveling off in 2011 and 2012.',
            'articles': [
                {
                    'title': 'Municipalities Feel Pinch as Another Debt Market Falters',
                    'link': 'http://www.nytimes.com/2008/02/15/business/15muni.html?pagewanted=all'
                },
                {
                    'title': 'It\'s Hard to Thaw a Frozen Market',
                    'link': 'http://www.nytimes.com/2008/03/23/business/23view.html'
                }
            ],
            'img': 'http://images.all-free-download.com/images/graphicmedium/go_medias_sample_vector_pack_2_119602.jpg',
            'start': 2007,
            'end': 2012,
            'markets': [0, 1, 2, 3, 4, 5],
            'indicators': [0, 2]
        }
    ];

    var marketOptions = {
        title: {
            text: 'Volume traded on Capital Markets by Year (in Billions of US$)',
            x: -20 //center
        },
        subtitle: {
            text: 'Source: SIFMA',
            x: -20
        },
        xAxis: {
        },
        yAxis: {
            tickInterval: 100,
            min: 0,
            max: 2300,
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
            text: 'Indicators % Rise and Fall by Year',
            x: -20 //center
        },
        subtitle: {
            text: 'Source: SIFMA',
            x: -20
        },
        xAxis: {},
        yAxis: {
            tickInterval: 20,
            min: -40,
            max: 40,
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
                //start();
            }
        );

    }();

    return {
        nextStory: nextStory,
        lastStory: lastStory,
        startStop: startStop
    };

}());