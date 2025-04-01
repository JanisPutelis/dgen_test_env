// Page navigation
let currentPage = 1;
const totalPages = 3;
const pageViewer = document.getElementById('pageViewer');
let charts = null;

function initializeCharts(container) {
    const configOverrides = {
        responsive: true,
        maintainAspectRatio: false,
        devicePixelRatio: 2,
        plugins: { legend: { display: false } }
    };

    const trendChart = new Chart(container.querySelector('#trendChart').getContext('2d', { willReadFrequently: true }), {
        type: 'line',
        data: {
            labels: ['Mar 7', 'Mar 8', 'Mar 9', 'Mar 10', 'Mar 11', 'Mar 12', 'Mar 13', 'Mar 14'],
            datasets: [{
                label: 'Trend Index',
                data: [81.5, 81.8, 82.0, 81.9, 82.3, 82.7, 83.0, 83.1],
                borderColor: '#D32F2F',
                backgroundColor: 'rgba(211, 47, 47, 0.2)',
                fill: true,
                tension: 0.4,
                pointRadius: 3,
                pointBackgroundColor: '#D32F2F'
            }]
        },
        options: {
            ...configOverrides,
            layout: { padding: { bottom: 20 } },
            scales: {
                y: { beginAtZero: false, title: { display: true, text: 'Price (EUR)' }, grid: { color: '#e0e0e0' } },
                x: { title: { display: false }, grid: { display: false } }
            }
        }
    });

    const volatilityChart = new Chart(container.querySelector('#volatilityChart').getContext('2d', { willReadFrequently: true }), {
        type: 'line',
        data: {
            labels: ['Feb 13', 'Feb 20', 'Feb 27', 'Mar 6', 'Mar 13', 'Mar 14'],
            datasets: [{
                label: 'Volatility (%)',
                data: [28.5, 29.0, 28.8, 29.1, 29.2, 29.3],
                borderColor: '#D32F2F',
                backgroundColor: 'rgba(211, 47, 47, 0.2)',
                fill: true,
                tension: 0.4,
                pointRadius: 3,
                pointBackgroundColor: '#D32F2F'
            }]
        },
        options: {
            ...configOverrides,
            scales: {
                y: { beginAtZero: false, title: { display: true, text: 'Volatility (%)' }, grid: { color: '#e0e0e0' } },
                x: { title: { display: false }, grid: { display: false } }
            }
        }
    });

    const volumeChart = new Chart(container.querySelector('#volumeChart').getContext('2d', { willReadFrequently: true }), {
        type: 'line',
        data: {
            labels: ['Feb 13', 'Feb 20', 'Feb 27', 'Mar 6', 'Mar 13', 'Mar 14'],
            datasets: [{
                label: 'Volume',
                data: [1500, 1450, 1480, 1520, 1490, 1510],
                borderColor: '#D32F2F',
                backgroundColor: 'rgba(211, 47, 47, 0.2)',
                fill: true,
                tension: 0.4,
                pointRadius: 3,
                pointBackgroundColor: '#D32F2F'
            }]
        },
        options: {
            ...configOverrides,
            scales: {
                y: { beginAtZero: false, title: { display: true, text: 'Volume' }, grid: { color: '#e0e0e0' } },
                x: { title: { display: false }, grid: { display: false } }
            }
        }
    });

    return { trendChart, volatilityChart, volumeChart };
}

function updatePage() {
    const page = document.getElementById(`page${currentPage}`).cloneNode(true);
    page.style.display = 'flex';
    pageViewer.innerHTML = '';
    pageViewer.appendChild(page);

    if (charts) {
        charts.trendChart.destroy();
        charts.volatilityChart.destroy();
        charts.volumeChart.destroy();
        charts = null;
    }

    if (currentPage === 3) {
        charts = initializeCharts(page);
    }

    document.getElementById('prevBtn').disabled = currentPage === 1;
    document.getElementById('nextBtn').disabled = currentPage === totalPages;
}

function nextPage() {
    if (currentPage < totalPages) {
        currentPage++;
        updatePage();
    }
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        updatePage();
    }
}

window.onload = () => {
    currentPage = 1;
    updatePage();
};

function populatePages(
    date = "Saturday, 08 March 2025",
    title = "Energy Trading Daily Trend Report",
    subtitle = "Market Trends & Volatility Analysis",
    categories = "Power | Gas | Carbon",
    disclaimerText = "This report is for informational purposes only and does not constitute financial advice. The data is based on settlement prices and volatility analysis as of the date indicated. No liability is accepted for any decisions made based on this report.",
    
    // New parameters for Trend Analysis
    trend = "↑ Upward",
    trendProbability = "59%",
    expectedPrice = "87 +/-3€",

    // New parameters for Last MCP
    lastMcpPrice = "200 €",
    change1d = "+0.85%",
    change7d = "+1.72%",
    
    // New parameters for Volatility Metrics
    volatility5d = "10%",
    volatility30d = "29.3%",
    expectedVolatility3d = "25.6%",
    
    // New parameters for cover
    reportTitle = "Energy Trading Daily Report",
    product = "Germany 2026 Base"
) {
    // Determine the highlight class based on trend value
    const trendClass = trend === "↑ Upward" ? "highlight_green" : trend === "↓ Downward" ? "highlight" : "highlight";

    // Title Page
    const titlePage = document.getElementById('page1');
    titlePage.innerHTML = `
       <div>
            <h1>${title}</h1>
            <p>${subtitle}</p>
            <p>${date}</p>
            <p>${categories}</p>
        </div>
    `;

    // Disclaimer Page
    const disclaimerPage = document.getElementById('page2');
    disclaimerPage.innerHTML = `
        <div>
            <h2>Disclaimer</h2>
            <div class="disclaimer-content">
                <p>${disclaimerText}</p>
            </div>
        </div>
    `;

    // Report Page - Update cards
    const reportPage = document.getElementById('page3');
    reportPage.innerHTML = `
        <div class="container">
            <div class="cover" id="cover">
                <div class="cover_left">
                    <i class="fas fa-calendar-week logo"></i>
                    <div class="divider"></div>
                    <div class="cover_text">
                        <h1>${reportTitle}</h1>
                        <p class="product">${product}</p>
                    </div>
                </div>
            </div>
            <div class="product_page">
                <div class="section">
                    <div class="cards">
                        <div class="card">
                            <div class="card_header">
                                <div class="card_title">
                                    <i class="fas fa-chart-line icon"></i><span>Trend analysis</span>
                                </div>
                            </div>
                            <div class="card_content combined">
                                <div class="card_content_row">
                                    <span class="label">Trend</span>
                                    <span class="${trendClass}">${trend}</span>
                                </div>
                                <div class="card_content_row">
                                    <span class="label">Probability</span>
                                    <span class="highlight">${trendProbability}</span>
                                </div>
                                <div class="card_content_row">
                                    <span class="label">Expected price</span>
                                    <span class="highlight">${expectedPrice}</span>
                                </div>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card_header">
                                <div class="card_title">
                                    <i class="fas fa-euro-sign icon"></i><span>Last MCP</span>
                                </div>
                            </div>
                            <div class="card_content last_mcp">
                                <div class="card_content_row">
                                    <span class="label">Price</span>
                                    <span class="highlight">${lastMcpPrice}</span>
                                </div>
                                <div class="card_content_row">
                                    <span class="label">Change (1d)</span>
                                    <span class="highlight">${change1d}</span>
                                </div>
                                <div class="card_content_row">
                                    <span class="label">Change (7d)</span>
                                    <span class="highlight">${change7d}</span>
                                </div>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card_header">
                                <div class="card_title">
                                    <i class="fas fa-bolt icon"></i><span>Volatility metrics</span>
                                </div>
                            </div>
                            <div class="card_content combined">
                                <div class="card_content_row">
                                    <span class="label">5 Day</span>
                                    <span class="highlight">${volatility5d}</span>
                                </div>
                                <div class="card_content_row">
                                    <span class="label">30 Day</span>
                                    <span class="highlight">${volatility30d}</span>
                                </div>
                                <div class="card_content_row">
                                    <span class="label">Expected (3d)</span>
                                    <span class="highlight">${expectedVolatility3d}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="charts_container">
                        <div class="chart chart_full">
                            <div class="chart_header">
                                <i class="fas fa-chart-line icon"></i><span>Trend Analysis (7 Days)</span>
                            </div>
                            <div class="chart_canvas">
                                <canvas id="trendChart"></canvas>
                            </div>
                        </div>
                        <div class="chart_row">
                            <div class="chart chart_small">
                                <div class="chart_header">
                                    <i class="fas fa-bolt icon"></i><span>Volatility (%)</span>
                                </div>
                                <div class="chart_canvas">
                                    <canvas id="volatilityChart"></canvas>
                                </div>
                            </div>
                            <div class="chart chart_small">
                                <div class="chart_header">
                                    <i class="fas fa-exchange-alt icon"></i><span>Volume</span>
                                </div>
                                <div class="chart_canvas">
                                    <canvas id="volumeChart"></canvas>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Example usage with custom values:
populatePages();

function downloadPDF() {
    // First populate the pages
    populatePages();

    const toolbar = document.querySelector('.toolbar');
    toolbar.style.display = 'none';

    const pdfContainer = document.createElement('div');
    pdfContainer.style.width = '720px';
    pdfContainer.style.fontFamily = "'Roboto', Arial, Helvetica, sans-serif";

    // Clone the populated pages instead of creating new ones
    const titlePage = document.getElementById('page1').cloneNode(true);
    titlePage.style.cssText = `
        display: flex; flex-direction: column; justify-content: center; align-items: center;
        height: 8in; break-after: page; box-sizing: border-box; background-color: #ffffff;
    `;
    pdfContainer.appendChild(titlePage);

    const disclaimerPage = document.getElementById('page2').cloneNode(true);
    disclaimerPage.style.cssText = `
        display: flex; flex-direction: column; justify-content: center; align-items: center;
        height: 8in; break-after: page; box-sizing: border-box; background-color: #ffffff;
    `;
    pdfContainer.appendChild(disclaimerPage);

    // Rest of your existing code remains the same
    const reportPage = document.getElementById('page3').querySelector('.container').cloneNode(true);
    reportPage.style.display = 'block';
    reportPage.style.position = 'static';
    reportPage.style.height = 'auto';

    const tempContainer = document.createElement('div');
    tempContainer.style.position = 'absolute';
    tempContainer.style.left = '-9999px';
    tempContainer.appendChild(reportPage.cloneNode(true));
    document.body.appendChild(tempContainer);

    const tempCharts = initializeCharts(tempContainer);

    setTimeout(() => {
        const trendImg = document.createElement('img');
        trendImg.src = tempCharts.trendChart.toBase64Image('image/png', 2);
        trendImg.style.width = '704px';
        trendImg.style.height = 'auto';
        reportPage.querySelector('#trendChart').parentElement.replaceChild(trendImg, reportPage.querySelector('#trendChart'));

        const volatilityImg = document.createElement('img');
        volatilityImg.src = tempCharts.volatilityChart.toBase64Image('image/png', 2);
        volatilityImg.style.width = '345px';
        volatilityImg.style.height = 'auto';
        reportPage.querySelector('#volatilityChart').parentElement.replaceChild(volatilityImg, reportPage.querySelector('#volatilityChart'));

        const volumeImg = document.createElement('img');
        volumeImg.src = tempCharts.volumeChart.toBase64Image('image/png', 2);
        volumeImg.style.width = '345px';
        volumeImg.style.height = 'auto';
        reportPage.querySelector('#volumeChart').parentElement.replaceChild(volumeImg, reportPage.querySelector('#volumeChart'));

        pdfContainer.appendChild(reportPage);

        const opt = {
            margin: [0.5, 0.5, 0.5, 0.5],
            filename: 'Energy_Trading_Daily_Report_March_08_2025.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { 
                scale: 3,
                dpi: 300,
                width: 720,
                useCORS: true
            },
            jsPDF: { 
                unit: 'in',
                format: 'letter',
                orientation: 'portrait'
            },
            pagebreak: { 
                mode: ['css'],
                avoid: ['.card', '.chart']
            }
        };

        html2pdf().set(opt).from(pdfContainer).save().then(() => {
            tempCharts.trendChart.destroy();
            tempCharts.volatilityChart.destroy();
            tempCharts.volumeChart.destroy();
            document.body.removeChild(tempContainer);
            toolbar.style.display = 'flex';
            updatePage();
        }).catch((error) => {
            console.error('PDF generation failed:', error);
            toolbar.style.display = 'flex';
            updatePage();
            alert('Failed to generate PDF. Please try again.');
        });
    }, 500);
}