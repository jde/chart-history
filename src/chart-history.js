/*jshint multistr: true */
function toTitleCase(str) {
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

var chartHistory = (function () {

    var marketsChart, indicatorsChart, play;

    var currentStory = 0;
    var stories = [{"title":"Dot-com Bubble","description":"The growth of the Internet lead to rapidly rising valuations for stocks in that sector and a boom in initial public offerings.","start":1997,"end":2000,"articles":[{"date":"May 15, 1997","title":"Guessing the Next Chapter Of Virtual Bookselling","url":"http:\/\/www.nytimes.com\/1997\/05\/04\/business\/guessing-the-next-chapter-of-virtual-bookselling.html","year":1997,"author":"SANA SIWOLOP"},{"date":"July 30, 1997","title":"New Issues Lift A Lucky Few Mutual Funds","url":"http:\/\/www.nytimes.com\/1999\/07\/30\/business\/the-markets-market-place-new-issues-lift-a-lucky-few-mutual-funds.html","year":1997,"author":"RICHARD A. OPPEL Jr"},{"date":"March 29, 1998","title":"Rolling The Dice On Expensive I.P.O.'s","url":"http:\/\/www.nytimes.com\/1998\/03\/29\/business\/market-watch-rolling-the-dice-on-expensive-ipo-s.html","year":1998,"author":"FLOYD NORRIS"},{"date":"May 31, 1998","title":"Insider Sales Don't Always Burn Outsiders in I.P.O.'s","url":"http:\/\/www.nytimes.com\/1998\/05\/31\/business\/investing-it-insider-sales-don-t-always-burn-outsiders-in-ipo-s.html","year":1998,"author":"RICK GLADSTONE"},{"date":"Sept. 6, 1998","title":"Many Newcomers Are Grounded by Turbulence","url":"http:\/\/www.nytimes.com\/1998\/09\/06\/business\/the-markets-in-turmoil-the-ipo-market-many-newcomers-are-grounded-by-turbulence.html","year":1998,"author":"SANA SIWOLOP"},{"date":"Sept. 24, 1998","title":"The debut of an on-line auction house reminds investors of the glories of initial offerings gone by.","url":"http:\/\/www.nytimes.com\/1998\/09\/25\/business\/markets-market-place-debut-line-auction-house-reminds-investors-glories-initial.html","year":1998,"author":"Saul Hansell"},{"date":"Jan. 26, 1999","title":"Time Is Added for Nasdaq I.P.O. Pricing","url":"http:\/\/www.nytimes.com\/1999\/01\/26\/business\/the-markets-time-is-added-for-nasdaq-ipo-pricing.html","year":1999,"author":"NYTIMES"},{"date":"Sept. 19, 1999","title":"Cash Is Tool In Gauging I.P.O. Health","url":"http:\/\/www.nytimes.com\/1999\/09\/19\/business\/investing-cash-is-tool-in-gauging-ipo-health.html","year":1999,"author":"HILARY ROSENBERG"},{"date":"Dec. 2, 1999","title":"Online Investors Grasping Initial Offerings","url":"http:\/\/www.nytimes.com\/1999\/12\/02\/business\/online-investors-grasping-initial-offerings.html?pagewanted=all&src=pm","year":1999,"author":"PATRICK McGEEHAN"},{"date":"Feb. 2, 2000","title":"Top Regulator Tells Investors It's Time to Be More Prudent","url":"http:\/\/www.nytimes.com\/2000\/02\/13\/business\/top-regulator-tells-investors-it-s-time-to-be-more-prudent.html","year":2000,"author":"GRETCHEN MORGENSON"}]},{"title":"Dot-com Crash","description":"The speculative bubble in Internet stocks popped and affected the broader capital markets as companies postponed their initial public and secondary offerings.","start":2000,"end":2002,"articles":[{"date":"April 14, 2000","title":"The Sharp Decline in the Stock Market Is Expected to Delay Initial Public Offerings","url":"http:\/\/www.nytimes.com\/2000\/04\/15\/business\/markets-sharp-decline-stock-market-expected-delay-initial-public-offerings.html","year":2000,"author":"KENNETH N. GILPIN"},{"date":"July 1, 2000","title":"Downturn in Underwriting As Markets Show Volatility","url":"http:\/\/www.nytimes.com\/2000\/07\/01\/business\/downturn-in-underwriting-as-markets-show-volatility.html","year":2000,"author":"PATRICK McGEEHAN"},{"date":"Dec. 12, 2000","title":"A Drought Hit Market For Capital","url":"http:\/\/www.nytimes.com\/2000\/12\/30\/business\/a-drought-hit-market-for-capital.html","year":2000,"author":"PATRICK McGEEHAN"},{"date":"Dec. 24, 2000","title":"The Dot-Com Bubble Bursts","url":"http:\/\/www.nytimes.com\/2000\/12\/24\/opinion\/the-dot-com-bubble-bursts.html","year":2000,"author":null},{"date":"Jan. 28, 2001","title":"Funds No Longer Count on I.P.O. Lift","url":"http:\/\/www.nytimes.com\/2001\/01\/28\/business\/investing-funds-no-longer-count-on-ipo-lift.html","year":2001,"author":"ALEX BERENSON"},{"date":"Sept. 14, 2001","title":"As Activity Resumes in the Bond Market, Investors Send Interest Rates Plummeting","url":"http:\/\/www.nytimes.com\/2001\/09\/14\/business\/as-activity-resumes-in-the-bond-market-investors-send-interest-rates-plummeting.html","year":2001,"author":"JONATHAN FUERBRINGER"},{"date":"Oct. 10, 2001","title":"Stock Market Shrugs Off Air Strikes","url":"http:\/\/www.nytimes.com\/2001\/10\/09\/business\/a-nation-challenged-the-equities-stock-market-shrugs-off-air-strikes.html","year":2001,"author":"GRETCHEN MORGENSON"},{"date":"Nov. 29, 2001","title":"In Turbulent Bond Market, Enron's Woes Exacerbate Turmoil","url":"http:\/\/www.nytimes.com\/2001\/11\/29\/business\/enron-s-collapse-market-turbulent-bond-market-enron-s-woes-exacerbate-turmoil.html","year":2001,"author":"GRETCHEN MORGENSON"},{"date":"July 21, 2002","title":"The Incredible Shrinking Stock Market","url":"http:\/\/www.nytimes.com\/2002\/07\/21\/weekinreview\/the-nation-the-incredible-shrinking-stock-market.html","year":2002,"author":"SETH W. FEASTER"},{"date":"Sept. 18, 2002","title":"2 Key Indexes Drop to Lowest Levels Since Early August","url":"http:\/\/www.nytimes.com\/2002\/09\/18\/business\/the-markets-stocks-bonds-2-key-indexes-drop-to-lowest-levels-since-early-august.html","year":2002,"author":"JONATHAN FUERBRINGER"}]},{"title":"Housing Boom and Credit Expansion","description":"Low interest rates spur investment in housing and alternative lending, making it easier for companies to raise capital for expansion.","start":2003,"end":2007,"articles":[{"date":"May 18, 2003","title":"Stocks Are Looking Up. Bonds Look Askance.","url":"http:\/\/www.nytimes.com\/2003\/05\/18\/business\/market-watch-stocks-are-looking-up-bonds-look-askance.html","year":2003,"author":"GRETCHEN MORGENSON"},{"date":"June 6, 2003","title":"Small Investors, Once Burned, Lead New Bull","url":"http:\/\/www.nytimes.com\/2003\/06\/22\/business\/22STOX.html","year":2003,"author":"GRETCHEN MORGENSON"},{"date":"June 27, 2003","title":"Putting Sticker Prices on Corporate Bonds","url":"http:\/\/www.nytimes.com\/2003\/06\/27\/business\/putting-sticker-prices-on-corporate-bonds.html","year":2003,"author":"FLOYD NORRIS"},{"date":"Aug. 19, 2004","title":"Google raises $1.67 billion in an initial public offering. The company, which had nearly 2,300 full-time workers at the time, now has more than 54,600 employees.","url":"http:\/\/www.nytimes.com\/2004\/08\/05\/business\/05place.html","year":2004,"author":"SAUL HANSELL"},{"date":"Aug. 22, 2004","title":"That Not-So-Distant Thunder in the Bond Market","url":"http:\/\/www.nytimes.com\/2004\/08\/22\/business\/portfolios-etc-that-not-so-distant-thunder-in-the-bond-market.html","year":2004,"author":"JONATHAN FUERBRINGER"},{"date":"March 25, 2005","title":"Too Much Capital; Why It Is Getting Harder to Find a Good Investment","url":"http:\/\/www.nytimes.com\/2005\/03\/25\/business\/25norris.html?pagewanted=print&position=","year":2005,"author":"FLOYD NORRIS"},{"date":"Oct. 22, 2005","title":"Unending Housing Boom Tosses Aside Rate Increases and the Old Rules","url":"http:\/\/www.nytimes.com\/2005\/10\/22\/business\/22charts.html","year":2005,"author":"FLOYD NORRIS"},{"date":"July 15, 2007","title":"An I.P.O. Glut Just Waiting to Happen","url":"http:\/\/www.nytimes.com\/2007\/07\/15\/business\/yourmoney\/15deal.html","year":2007,"author":"MICHAEL J. de la MERCED"},{"date":"March 11, 2007","title":"Crisis Looms in Market for Mortgages","url":"http:\/\/www.nytimes.com\/2007\/03\/11\/business\/11mortgage.html?pagewanted=all","year":2007,"author":"GRETCHEN MORGENSON"},{"date":"Aug. 31, 2007","title":"Why a U.S. Subprime Mortgage Crisis Is Felt Around the World","url":"http:\/\/www.nytimes.com\/2007\/08\/31\/business\/worldbusiness\/31derivatives.html","year":2007,"author":"JENNY ANDERSON and HEATHER TIMMONS"}]},{"title":"Financial Crisis","description":"A decline in housing values and a rise in bad mortgages leads to a credit crisis that spreads to the global economy, causing the biggest downturn since the Great Depression.","start":2007,"end":2009,"articles":[{"date":"Oct. 7, 2007","title":"If Everyone Knows It, Someone Is Wrong","url":"http:\/\/query.nytimes.com\/gst\/fullpage.html?res=9F07E2DD173EF934A35753C1A9619C8B63","year":2007,"author":"PETER L. BERNSTEIN"},{"date":"Oct. 22, 2007","title":"Mortgage Security Bondholders Facing a Cutoff of Interest Payments","url":"http:\/\/www.nytimes.com\/2007\/10\/22\/business\/22market.html","year":2007,"author":"VIKAS BAJAJ"},{"date":"Nov. 18, 2007","title":"Stock Market Likely to Stay Under Pressure","url":"http:\/\/www.nytimes.com\/2007\/11\/18\/business\/18cnd-markets.html","year":2007,"author":"VIKAS BAJAJ"},{"date":"Jan. 5, 2008","title":"The Appetite for Securities Turns Less Hearty","url":"http:\/\/www.nytimes.com\/2008\/01\/05\/business\/05charts.html","year":2008,"author":"FLOYD NORRIS"},{"date":"March 3, 2008","title":"I.P.O. Cancellations Hit $21.4 Billion","url":"http:\/\/dealbook.nytimes.com\/2008\/03\/03\/ipo-cancellations-hit-214-billion\/","year":2008,"author":"DEALBOOK"},{"date":"March 23, 2008","title":"It's Hard to Thaw a Frozen Market","url":"http:\/\/www.nytimes.com\/2008\/03\/23\/business\/23view.html","year":2008,"author":"TYLER COWEN"},{"date":"Feb. 15, 2008","title":"Municipalities Feel Pinch as Another Debt Market Falters","url":"http:\/\/www.nytimes.com\/2008\/02\/15\/business\/15muni.html?pagewanted=all","year":2008,"author":"JULIE CRESWELL and VIKAS BAJAJ"},{"date":"Sept. 17, 2008","title":"Financial Crisis Enters New Phase","url":"http:\/\/www.nytimes.com\/2008\/09\/18\/business\/18markets.html?pagewanted=all","year":2008,"author":"VIKAS BAJAJ"},{"date":"Sept. 26, 2008","title":"Debt-Laden Companies Under Pressure","url":"http:\/\/dealbook.nytimes.com\/2008\/09\/26\/debt-laden-companies-under-pressure\/","year":2008,"author":"DEALBOOK"},{"date":"Jan. 26, 2009","title":"Bond Market Shows Small Signs of Life","url":"http:\/\/dealbook.nytimes.com\/2009\/01\/26\/bond-market-shows-smalls-signs-of-life\/","year":2009,"author":"DEALBOOK"}]},{"title":"The Recovery","description":"As the global economy recovers from the Great Recession, companies are taking advantage of low interest rates to issue debt to expand, communities are obtaining financing in the municipal bond market, and a new crop of technology companies are reinvigorating the market for initial public offerings.","start":2009,"end":2012,"articles":[{"date":"April 2, 2009","title":"Build America Bonds Will Save $12.3 Billion, Analysis Says","url":"http:\/\/www.nytimes.com\/2010\/04\/02\/business\/02treasury.html","year":2009,"author":"SEWELL CHAN"},{"date":"April 18, 2009","title":"Corporate Bonds Are Selling, if There's a Safety Net","url":"http:\/\/www.nytimes.com\/2009\/04\/18\/business\/economy\/18charts.html","year":2009,"author":"FLOYD NORRIS"},{"date":"Sept. 11, 2009","title":"Around the World, Stock Markets Fell and Rose, Together","url":"http:\/\/www.nytimes.com\/2009\/09\/12\/business\/12charts.html","year":2009,"author":"FLOYD NORRIS"},{"date":"Nov. 17, 2010","title":"Banks Give G.M.\u2019s I.P.O. a Warm Welcome","url":"http:\/\/dealbook.nytimes.com\/2010\/11\/17\/banks-give-g-m-s-i-p-o-a-warm-welcome\/","year":2010,"author":"MICHAEL J. DE LA MERCED"},{"date":"Dec. 31, 2010","title":"Global Stock Markets Fight to Return From Recession","url":"http:\/\/www.nytimes.com\/2011\/01\/01\/business\/global\/01charts.html","year":2010,"author":"FLOYD NORRIS"},{"date":"April 7, 2011","title":"The Dot-Com Boom, Then And Now","url":"http:\/\/dealbook.nytimes.com\/2011\/04\/07\/the-dot-com-boom-then-and-now\/","year":2011,"author":"MAC WILLIAM BISHOP"},{"date":"March 18, 2012","title":"Surprise Increase in Rates Is Credited to Signs of Recovery","url":"http:\/\/www.nytimes.com\/2012\/03\/19\/business\/economy\/signs-of-recovery-spur-an-uptick-in-interest-rates.html","year":2012,"author":"NELSON D. SCHWARTZ"},{"date":"June 30, 2012","title":"Searching for Calm in Bond Markets","url":"http:\/\/www.nytimes.com\/2012\/07\/01\/your-money\/bond-market-volatility-and-how-to-fight-it-fundamentally.html","year":2012,"author":"PAUL J. LIM"},{"date":"Aug. 24, 2012","title":"U.S. Stock Market Leads Most Others in Recovery","url":"http:\/\/www.nytimes.com\/2012\/08\/25\/business\/economy\/american-stock-market-leads-others-in-recovery-from-crisis.html","year":2012,"author":"FLOYD NORRIS"},{"date":"Dec. 28, 2012","title":"In a 5-Year Comparison, the U.S. Recovery Fares Well","url":"http:\/\/www.nytimes.com\/2012\/12\/29\/business\/us-recovery-fares-well-in-a-5-year-comparison.html","year":2012,"author":"FLOYD NORRIS"}]}];
    var defaultDefinition = {name: '',description: 'Mouse over the chart for definitions of the markets.'};
    var marketDefinitions = [
        {name: 'Municipal Bonds',description: 'Debt issued by local governments and their agencies. Municipal bond issuers include states, cities, counties, public utilities and school districts.'},
        {name: 'Corporate Bonds',description: 'Debt issued by a company. The interest is usually higher than municipal bonds and Treasurys because it is considered to be more risky. The interest rates on corporate bonds is based on a company\'s ability to pay.'},
        {name: 'Asset-Backed Securities',description: 'Securities backed by the collateral of underlying assets. Such assets can include auto loans, credit card debt, mortgages or a company\'s accounts receivables.'},
        {name: 'U.S. Treasurys',description: 'Debt issued by the U.S. government. Treasurys are generally considered to risk-free assets by investors because the federal government stands behind them with its taxing power to avoid default.'},
        {name: 'Initial Public Offerings',description: 'The first sale of shares by a private company to the public markets. Most companies go public to gain capital to grow their businesses.'},
        {name: 'Secondary Offerings',description: 'New stock issued by a company that has already made its initial public offering. Companies conduct secondary offerings to expand their businesses, refinance their operations or provide liquidity to large shareholders who want to reduce their positions in the company.'}];
    var indicatorDefinitions = [
        {name: 'Yield on 10-year Treasury Note',description: 'The return that investors receive on a debt obligation issued by the U.S. government that matures in 10 years. The rate serves as a benchmark for other debt, such as corporate bonds and mortgages.'},
        {name: 'Standard & Poor\'s 500-stock index',description: 'An index of 500 stocks picked by Standard & Poor\'s to reflect the largest U.S. stocks by market value. The S&P 500 is a top benchmark for the overall U.S. stock market.'},
        {name: 'Gold Price Per Ounce',description: 'Many investors consider gold a hedge against inflation and market risk. Gold prices reflect the value of the physical asset as well as investors’ expectations about inflation and market volatility.'},
        {name: '30-Year Fixed-Rate Mortgage',description: 'A mortgage that has a fixed interest rate for the entire 30-year term of the loan. A 30-year fixed rate mortgage is the most common type of home loan and is used as a benchmark for the health of mortgage lending.'}];

    var marketData = ",1996,1997,1998,1999,2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012---Municipal bonds,185.2,220.7,286.8,227.5,200.8,287.7,357.5,382.7,359.8,408.2,386.5,429.3,390.6,409.6,433.1,294.7,378.9---Corporate,342.7,466,610.9,629.2,587.5,776.1,636.7,775.8,780.7,752.8,1058.9,1128.3,707.2,901.9,1062.7,1012.1,1360.1---Asset-Backed,220.3,292.5,478.5,427.1,383.2,545,662.4,902.1,1184.2,1654.7,1671.3,1283.6,185.3,183.3,126.5,147.7,238.7---Treasury,612.4,540,438.4,364.6,312.4,380.7,571.6,745.2,853.3,746.2,788.5,752.3,1037.3,2074.9,2304,2103.2,2318.2---True IPOs,49.9,43.2,36.6,64.3,75.8,36,25.8,15.9,47.9,39.6,46.1,50.7,7.2,24.5,43.1,40.7,42.6---Secondary Offerings,65.5,75.9,71.2,97.5,112.9,87.6,75.2,74.8,96.7,97.8,99.3,96.4,153.7,227.7,187.5,137.3,189.1";

    var indicatorData = ",1996,1997,1998,1999,2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,2010,2011,2012---10 Year Interest,6.4,6.4,5.3,5.7,6,5,4.6,4,4.3,4.3,4.8,4.6,3.7,3.26,3.21,2.79,1.8---S&P 500,740.74,970.43,1229.23,1469.25,1320.28,1148.08,879.82,1111.92,1211.92,1248.29,1418.3,1468.36,903.25,1115.1,1257.64,1257.6,1426.19---Unemployment ,5.6,5.3,4.6,4.3,4,4.2,5.7,5.8,5.7,5.3,4.7,4.6,5,7.8,9.8,9.1,8.3---Gold price per ounce,$369,$287.05,$288.7,$290.25,$272.65,$276.5,$342.75,$417.25,$435.6,$513,$635.7,$836.5,$869.75,$1087.5,$1420.25,$1531,$1664";

    var marketOptions = {
        chart: {
            type: 'spline',
            backgroundColor: 'none'
        },
        colors: ['#2f7ed8', '#0d233a', '#8bbc21', '#910000', '#1aadce', '#492970', '#777777'],
        title: {
            text: 'Volume traded on Capital Markets by Year (in Billions of $US)',
            align: 'center',
            y: 350,
            x: 20,
            style: {
                color: '#3E576F',
                fontWeight: 'bold',
                fontSize: '14px'
            }
        },
        plotOptions: {
            spline: {
                events: {
                    mouseOver: function (e) {
                        showDefinition(e.currentTarget._i, e.currentTarget.color);
                    }/*,
                    mouseOut: function (e) {
                        showDefinition(null);
                    }*/
                },
                marker: {
                    enabled: false
                }
            },
            area: {
                stacking: 'normal',
                marker: {
                    enabled: false
                }
            }
        },
        xAxis: {
            labels: {
                rotation: -45,
                align: 'right',
                style: {
                    fontSize: '12px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        },
        yAxis: {
//            tickInterval: 100,
            min: 0,
            max: 2500,
            title: "Volume (in trillions of $)",
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }],
            labels: {
                style: {
                    fontSize: '12px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        },
        series: [],
        legend: {
            layout: 'vertical',
            align: 'bottom',
            verticalAlign: 'bottom',
            borderWidth: 1,
            margin: 20,
            borderColor: 'white'
        },
        credits: {
            enabled: false
        },
        tooltip: {
            formatter: function () {
                return this.point.category + '<br><span style="color: ' + this.series.color + ';">' + toTitleCase(this.series.name) + '</span>   <strong>$' + this.point.y + ' bn</strong>';
            }
        },
        exporting: {
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
            borderColor: '#ff0000'
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

        $('.highcharts-legend').on('click', '.highcharts-legend-item', function (e) {
            e.preventDefault();
            console.log(e);
            console.log(this);
        });

        //$('#indicators').highcharts(indicatorOptions);
        //indicatorsChart = $('#indicators').highcharts();

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

    var showDefinition = function (i, color) {

        if (i === null) {
            $("#definitions").html(_.template(templates.definition, defaultDefinition));
            return null;
        }

        var col = parseInt(color.replace('#', ''), 16),
            r = col >> 16 & 0xff,
            g = col >> 8 & 0xff,
            b = col & 0xff;

        var $def = $("#definitions").html(_.template(templates.definition, marketDefinitions[i]));
        $def.css({
            color: color,
            'border-left': '5px solid ' + color,
            'background-color': 'rgba(' + r + ',' + g + ',' + b + ', .02)'
        });
        return i;

    };

    var showPlotBands = function (chart, id) {

        var a;

        for (var i = 0; i < stories.length; i++) {

            chart.xAxis[0].removePlotBand('pb' + stories[i].start + stories[i].end);


            if (i === id) {
                chart.xAxis[0].addPlotBand({
                    from: stories[i].start - 1996,
                    to: stories[i].end - 1996,
                    color: '#eeeeee',
                    id: 'pb' + stories[i].start + stories[i].end,
                    label: {
                        text: _.template(templates.bandLabel, stories[i]),
                        useHTML: false,
                        rotation: 90,
                        textAlign: 'left',
                        style: {
                            'font-size': '1em',
                            'font-weight': 'bold',
                            'color': '#aaaaaa'
                        }
                    }
                });
            }
        }

    };

    var drawTitles = function () {

        for (var i = 0; i < stories.length; i++) {
            stories[i].id = i;
            $("#titles").append(_.template(templates.title, stories[i]));
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

    var drawLayout = function () {

        $("#ebbandflow").html(_.template(templates.layout, {}));

    };

    var drawStories = function () {

        for (var i = 0; i < stories.length; i++) {
            stories[i].id = i;

            var $story = $(_.template(templates.story, stories[i]));

            var $articles = $story.find('.articles');

            for (var j = 0; j < stories[i].articles.length; j++) {
                $articles.append(_.template(templates.article, stories[i].articles[j]));
            }

            $("#stories").append($story);

            (function (i) {
                $('#s' + i).waypoint(function (direction) {
                    chartHistory.gotoStory(i);
                }, {context: '#stories'});
            }(i));


        }

    };

    var showStory = function (id) {

        var i, story = stories[id];

        selectTitle(id);

        //toggleSeries(marketsChart, story.markets);
        //toggleSeries(indicatorsChart, story.indicators);

        showPlotBands(marketsChart, currentStory);
        //showPlotBands(indicatorsChart, currentStory);


    };

    var nextStory = function () {

        currentStory++;
        currentStory = currentStory % stories.length;

        showStory(currentStory);

        $("#stories").scrollTo($("#s" + currentStory), 250);

    };

    var lastStory = function () {

        currentStory--;
        currentStory = currentStory % stories.length;

        showStory(currentStory);

        $("#stories").scrollTo($("#s" + currentStory), 250);

    };

    var gotoStory = function (s) {

        currentStory = s;
        currentStory = currentStory % stories.length;

        showStory(currentStory);

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

        var out, lines = data.split('---');

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

        var lines = data.split('---');

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
                    name: items.shift().toUpperCase(),
                    data: _.map(items, function (i) {return parseFloat(i.replace("$", ""));})
                });
            }
        });

        options.series.push({
            id: 'viewAll',
            type: 'column',
            name: 'VIEW ALL',
            data: []
        });
    };
    
    var init = function () {
        parseData(marketData, marketOptions);
        parseData(indicatorData, indicatorOptions);
        drawLayout();
        drawCharts();
        drawStories();
        drawTitles();
        showStory(0);
        //start();
    };

    // $('#stories').on('scroll', function (e) {
    //     console.log(e);
    // });

    return {
        nextStory: nextStory,
        lastStory: lastStory,
        gotoStory: gotoStory,
        startStop: startStop,

        init: init
    };

}());

