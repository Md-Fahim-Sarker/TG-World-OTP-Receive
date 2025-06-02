// === CONFIGURATION ===
const BOT_TOKEN = "7705452796:AAEG4_vXjqX1x4GlOnyStoHXlz3cxnXvUWk";
const CHAT_ID = "-1002549170084";
const SOCKET_URL = "wss://ivasms.com:2087";
const TOKEN = "eyJpdiI6IjRaSEI1eUpBM2dC..."; // Truncated
navigator.wakeLock?.request('screen');
// === TELEGRAM SEND FUNCTION ===
function sendToTelegram(text) {
    const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

    fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: CHAT_ID, text: text, parse_mode: "HTML" })
    })
    .then(res => res.json())
    .then(data => console.log("✅ Sent to Telegram", data))
    .catch(err => console.error("❌ Telegram Error:", err));
}

// === SOCKET CONNECTION ===
const socket = io(SOCKET_URL, {
    path: "/socket.io/",
    transports: ["websocket"],
    query: { token: TOKEN }
});

socket.on("connect", () => {
    const message = "✅ Connected to WebSocket.\n";
    document.getElementById("output").innerText = message;
    console.log(message);
});

socket.on("connect_error", (err) => {
    const message = "❌ Connection Error: " + err.message + "\n";
    document.getElementById("output").innerText += message;
    console.error(message);
});

// === Country Map ===
const countryMap = {
    "AF": "Afghanistan",
    "AL": "Albania",
    "DZ": "Algeria",
    "AS": "American Samoa",
    "AD": "Andorra",
    "AO": "Angola",
    "AI": "Anguilla",
    "AQ": "Antarctica",
    "AG": "Antigua and Barbuda",
    "AR": "Argentina",
    "AM": "Armenia",
    "AW": "Aruba",
    "AU": "Australia",
    "AT": "Austria",
    "AZ": "Azerbaijan",
    "BS": "Bahamas",
    "BH": "Bahrain",
    "BD": "Bangladesh",
    "BB": "Barbados",
    "BY": "Belarus",
    "BE": "Belgium",
    "BZ": "Belize",
    "BJ": "Benin",
    "BM": "Bermuda",
    "BT": "Bhutan",
    "BO": "Bolivia",
    "BA": "Bosnia and Herzegovina",
    "BW": "Botswana",
    "BR": "Brazil",
    "IO": "British Indian Ocean Territory",
    "VG": "British Virgin Islands",
    "BN": "Brunei",
    "BG": "Bulgaria",
    "BF": "Burkina Faso",
    "BI": "Burundi",
    "KH": "Cambodia",
    "CM": "Cameroon",
    "CA": "Canada",
    "CV": "Cape Verde",
    "KY": "Cayman Islands",
    "CF": "Central African Republic",
    "TD": "Chad",
    "CL": "Chile",
    "CN": "China",
    "CX": "Christmas Island",
    "CC": "Cocos (Keeling) Islands",
    "CO": "Colombia",
    "KM": "Comoros",
    "CD": "Congo (DRC)",
    "CG": "Congo (Republic)",
    "CK": "Cook Islands",
    "CR": "Costa Rica",
    "CI": "Côte d'Ivoire",
    "HR": "Croatia",
    "CU": "Cuba",
    "CY": "Cyprus",
    "CZ": "Czech Republic",
    "DK": "Denmark",
    "DJ": "Djibouti",
    "DM": "Dominica",
    "DO": "Dominican Republic",
    "EC": "Ecuador",
    "EG": "Egypt",
    "SV": "El Salvador",
    "GQ": "Equatorial Guinea",
    "ER": "Eritrea",
    "EE": "Estonia",
    "ET": "Ethiopia",
    "FJ": "Fiji",
    "FI": "Finland",
    "FR": "France",
    "GF": "French Guiana",
    "PF": "French Polynesia",
    "GA": "Gabon",
    "GM": "Gambia",
    "GE": "Georgia",
    "DE": "Germany",
    "GH": "Ghana",
    "GI": "Gibraltar",
    "GR": "Greece",
    "GL": "Greenland",
    "GD": "Grenada",
    "GP": "Guadeloupe",
    "GU": "Guam",
    "GT": "Guatemala",
    "GN": "Guinea",
    "GW": "Guinea-Bissau",
    "GY": "Guyana",
    "HT": "Haiti",
    "HN": "Honduras",
    "HK": "Hong Kong",
    "HU": "Hungary",
    "IS": "Iceland",
    "IN": "India",
    "ID": "Indonesia",
    "IR": "Iran",
    "IQ": "Iraq",
    "IE": "Ireland",
    "IL": "Israel",
    "IT": "Italy",
    "JM": "Jamaica",
    "JP": "Japan",
    "JO": "Jordan",
    "KZ": "Kazakhstan",
    "KE": "Kenya",
    "KI": "Kiribati",
    "KR": "South Korea",
    "KW": "Kuwait",
    "KG": "Kyrgyzstan",
    "LA": "Laos",
    "LV": "Latvia",
    "LB": "Lebanon",
    "LS": "Lesotho",
    "LR": "Liberia",
    "LY": "Libya",
    "LI": "Liechtenstein",
    "LT": "Lithuania",
    "LU": "Luxembourg",
    "MO": "Macau",
    "MK": "North Macedonia",
    "MG": "Madagascar",
    "MW": "Malawi",
    "MY": "Malaysia",
    "MV": "Maldives",
    "ML": "Mali",
    "MT": "Malta",
    "MH": "Marshall Islands",
    "MQ": "Martinique",
    "MR": "Mauritania",
    "MU": "Mauritius",
    "YT": "Mayotte",
    "MX": "Mexico",
    "FM": "Micronesia",
    "MD": "Moldova",
    "MC": "Monaco",
    "MN": "Mongolia",
    "ME": "Montenegro",
    "MA": "Morocco",
    "MZ": "Mozambique",
    "MM": "Myanmar",
    "NA": "Namibia",
    "NR": "Nauru",
    "NP": "Nepal",
    "NL": "Netherlands",
    "NC": "New Caledonia",
    "NZ": "New Zealand",
    "NI": "Nicaragua",
    "NE": "Niger",
    "NG": "Nigeria",
    "NU": "Niue",
    "NF": "Norfolk Island",
    "KP": "North Korea",
    "MP": "Northern Mariana Islands",
    "NO": "Norway",
    "OM": "Oman",
    "PK": "Pakistan",
    "PW": "Palau",
    "PS": "Palestine",
    "PA": "Panama",
    "PG": "Papua New Guinea",
    "PY": "Paraguay",
    "PE": "Peru",
    "PH": "Philippines",
    "PL": "Poland",
    "PT": "Portugal",
    "PR": "Puerto Rico",
    "QA": "Qatar",
    "RE": "Réunion",
    "RO": "Romania",
    "RU": "Russia",
    "RW": "Rwanda",
    "WS": "Samoa",
    "SM": "San Marino",
    "ST": "São Tomé and Príncipe",
    "SA": "Saudi Arabia",
    "SN": "Senegal",
    "RS": "Serbia",
    "SC": "Seychelles",
    "SL": "Sierra Leone",
    "SG": "Singapore",
    "SK": "Slovakia",
    "SI": "Slovenia",
    "SB": "Solomon Islands",
    "SO": "Somalia",
    "ZA": "South Africa",
    "ES": "Spain",
    "LK": "Sri Lanka",
    "SD": "Sudan",
    "SR": "Suriname",
    "SZ": "Swaziland",
    "SE": "Sweden",
    "CH": "Switzerland",
    "SY": "Syria",
    "TW": "Taiwan",
    "TJ": "Tajikistan",
    "TZ": "Tanzania",
    "TH": "Thailand",
    "TL": "Timor-Leste",
    "TG": "Togo",
    "TO": "Tonga",
    "TT": "Trinidad and Tobago",
    "TN": "Tunisia",
    "TR": "Turkey",
    "TM": "Turkmenistan",
    "TV": "Tuvalu",
    "UG": "Uganda",
    "UA": "Ukraine",
    "AE": "United Arab Emirates",
    "GB": "United Kingdom",
    "US": "United States",
    "UY": "Uruguay",
    "UZ": "Uzbekistan",
    "VU": "Vanuatu",
    "VE": "Venezuela",
    "VN": "Vietnam",
    "YE": "Yemen",
    "ZM": "Zambia",
    "ZW": "Zimbabwe"
};

// === HANDLE send_message_test EVENT ===
socket.on("send_message_test", (data) => {
    const bdTime = new Date().toLocaleString("en-GB", {
        timeZone: "Asia/Dhaka",
        year: "numeric", month: "2-digit", day: "2-digit",
        hour: "2-digit", minute: "2-digit", second: "2-digit"
    });

    const iso = (data.country_iso || "").toUpperCase();
    const fullCountry = countryMap[iso] || iso;

    function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

const htmlMessage = `
✨ <b>TG World SMS Received</b> ✨

⏰ <b>Time:</b> ${bdTime}
📞 <b>Number:</b> ${data.test_number}
🌐 <b>Country:</b> ${fullCountry}
🔧 <b>Service:</b> ${data.cli}
📡 <b>Range:</b> ${data.termination_name}

<blockquote>${escapeHtml(data.message)}</blockquote>
`;

    const logMessage = `📩 New SMS Test:
From: ${data.cli}
To: ${data.test_number}
Message: ${data.message}
Country: ${fullCountry}
Termination: ${data.termination_name}`;

    document.getElementById("output").innerText += logMessage + "\n\n";
    sendToTelegram(htmlMessage);
});

// === HANDLE livesms PACKETS ===
socket.io.engine.on("packet", (packet) => {
    if (packet.type === "message" && packet.data.startsWith("42/livesms")) {
        try {
            const jsonString = packet.data.substring(packet.data.indexOf("["));
            const parsed = JSON.parse(jsonString);
            const data = parsed[1];

            const message = data.message || "No message";
            const from = data.originator || "Unknown";
            const to = data.recipient || "Unknown";
            const country = data.country_iso || "N/A";
            const range = data.range || "N/A";
            const fullCountry = countryMap[country] || country;

            const bdTime = new Date().toLocaleString("en-GB", {
                timeZone: "Asia/Dhaka",
                year: "numeric", month: "2-digit", day: "2-digit",
                hour: "2-digit", minute: "2-digit", second: "2-digit"
            });

            const htmlMessage = `
📡 <b>Live SMS Received</b>

⏰ <b>Time:</b> ${bdTime}
📞 <b>Number:</b> ${to}
🌐 <b>Country:</b> ${fullCountry} (${range})
🔧 <b>Service:</b> ${from}

<blockquote>${message}</blockquote>
`;

            const log = `📡 Live SMS:
From: ${from}
To: ${to}
Country: ${fullCountry} (${range})
Message: ${message}`;

            document.getElementById("output").innerText += log + "\n\n";
            sendToTelegram(htmlMessage);

        } catch (err) {
            console.error("❌ Failed to parse livesms:", err);
        }
    }
});

// === DEBUG EVENTS ===
socket.onAny((event, data) => {
    console.log("🔥 Event:", event, data);
});
