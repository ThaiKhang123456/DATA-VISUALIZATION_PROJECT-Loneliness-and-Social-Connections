// Data
const data = [
    {country: 'Greece', percentage: 62, year: 2005},
    {country: 'Israel', percentage: 48, year: 2005},
    {country: 'Italy', percentage: 47, year: 2005},
    {country: 'Austria', percentage: 46, year: 2005},
    {country: 'France', percentage: 45, year: 2005},
    {country: 'Belgium', percentage: 42, year: 2005},
    {country: 'Spain', percentage: 40, year: 2005},
    {country: 'Finland', percentage: 39, year: 2002},
    {country: 'Germany', percentage: 37, year: 2005},
    {country: 'Netherlands', percentage: 35, year: 2005},
    {country: 'England', percentage: 33, year: 2018},
    {country: 'United States', percentage: 30, year: 2018},
    {country: 'Sweden', percentage: 30, year: 2005},
    {country: 'Switzerland', percentage: 26, year: 2005},
    {country: 'Denmark', percentage: 25, year: 2005},
];

const countries = data.map(d => d.country);
const percentages = data.map(d => d.percentage);
const years = data.map(d => `${d.percentage}% in ${d.year}`);

const trace = {
    x: percentages,
    y: countries,
    text: years,
    textposition: 'auto',
    type: 'bar',
    orientation: 'h',
    marker: {
        color: 'skyblue',
        line: {
            color: 'blue',
            width: 1.5
        }
    }
};

const layout = {
    title: 'Self-Reported Loneliness Among Older Adults',
    xaxis: { title: 'Percentage of Self-Reported Loneliness' },
    yaxis: { automargin: true },
    margin: { l: 150, r: 50, t: 50, b: 50 },
};

Plotly.newPlot('chart', [trace], layout);
