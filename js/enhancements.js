/* ============================================================
   Sts. Cyril and Methody Cathedral — Enhancements
   Floating Action Buttons, Mini Calendar, Newsletter Modal,
   Dropdown Navigation, Hero Dots
   ============================================================ */

(function () {
  'use strict';

  // ============================================================
  // 2026 ORTHODOX CHURCH CALENDAR — Bulgarian Patriarchate
  // Source: bg-patriarshia.bg/calendar/2026
  // + = Great Feast  * = Polyeleos feast
  // ============================================================
  var churchEvents = [
    // JANUARY
    {date:'2026-01-01',title:'+ New Year — Circumcision of the Lord / St. Basil the Great',type:'feast'},
    {date:'2026-01-04',title:'Divine Liturgy',type:'service'},
    {date:'2026-01-06',title:'+ Holy Theophany — Epiphany (Yordanovden)',type:'feast'},
    {date:'2026-01-07',title:'+ St. John the Baptist (Ivanovden)',type:'feast'},
    {date:'2026-01-11',title:'Divine Liturgy',type:'service'},
    {date:'2026-01-17',title:'* Venerable Anthony the Great (Antonovden)',type:'feast'},
    {date:'2026-01-18',title:'Sts. Athanasius & Cyril of Alexandria / Divine Liturgy',type:'feast'},
    {date:'2026-01-25',title:'St. Gregory the Theologian / Divine Liturgy',type:'service'},
    {date:'2026-01-27',title:'* Translation of Relics of St. John Chrysostom',type:'feast'},
    {date:'2026-01-30',title:'* Three Hierarchs: Basil, Gregory, John Chrysostom',type:'feast'},
    // FEBRUARY
    {date:'2026-02-01',title:'Divine Liturgy — Sunday of the Publican & Pharisee',type:'service'},
    {date:'2026-02-02',title:'+ Presentation of the Lord in the Temple (Candlemas)',type:'feast'},
    {date:'2026-02-08',title:'Divine Liturgy — Sunday of the Prodigal Son',type:'service'},
    {date:'2026-02-10',title:'* Hieromartyr Charalampus the Wonderworker',type:'feast'},
    {date:'2026-02-11',title:'* Hieromartyr Blaise of Sebasteia',type:'feast'},
    {date:'2026-02-14',title:'* Dormition of St. Cyril the Slavo-Bulgarian Enlightener',type:'feast'},
    {date:'2026-02-15',title:'Meatfare Sunday (Sunday of Judgment)',type:'service'},
    {date:'2026-02-22',title:'+ Forgiveness Sunday — Cheesefare (Sirni Zagovezni)',type:'feast'},
    {date:'2026-02-23',title:'Beginning of Great Lent — Clean Monday',type:'service'},
    {date:'2026-02-24',title:'* 1st & 2nd Finding of the Head of St. John the Baptist',type:'feast'},
    {date:'2026-02-25',title:'Presanctified Gifts Liturgy',type:'service'},
    {date:'2026-02-27',title:'Presanctified Gifts Liturgy',type:'service'},
    {date:'2026-02-28',title:'* Theodore Saturday',type:'feast'},
    // MARCH
    {date:'2026-03-01',title:'1st Sunday of Great Lent — Sunday of Orthodoxy',type:'feast'},
    {date:'2026-03-03',title:'Liberation of Bulgaria — National Holiday',type:'community'},
    {date:'2026-03-04',title:'Presanctified Gifts Liturgy',type:'service'},
    {date:'2026-03-06',title:'Presanctified Gifts Liturgy',type:'service'},
    {date:'2026-03-08',title:'2nd Sunday of Great Lent — St. Gregory Palamas',type:'feast'},
    {date:'2026-03-09',title:'* Holy 40 Martyrs of Sebaste',type:'feast'},
    {date:'2026-03-11',title:'Presanctified Gifts Liturgy / * St. Sophrony of Vratsa',type:'service'},
    {date:'2026-03-13',title:'Presanctified Gifts Liturgy',type:'service'},
    {date:'2026-03-15',title:'3rd Sunday of Great Lent — Veneration of the Holy Cross',type:'feast'},
    {date:'2026-03-18',title:'Presanctified Gifts Liturgy',type:'service'},
    {date:'2026-03-20',title:'Presanctified Gifts Liturgy',type:'service'},
    {date:'2026-03-22',title:'4th Sunday of Great Lent — Venerable John of the Ladder',type:'feast'},
    {date:'2026-03-25',title:'+ Annunciation of the Most Holy Theotokos (Blagoveshteniye)',type:'feast'},
    {date:'2026-03-27',title:'Presanctified Gifts Liturgy / Akathist Vespers',type:'service'},
    {date:'2026-03-28',title:'* Akathist Saturday',type:'feast'},
    {date:'2026-03-29',title:'5th Sunday of Great Lent — Venerable Mary of Egypt',type:'feast'},
    // APRIL
    {date:'2026-04-01',title:'Presanctified Gifts Liturgy',type:'service'},
    {date:'2026-04-03',title:'Presanctified Gifts Liturgy',type:'service'},
    {date:'2026-04-04',title:'* Lazarus Saturday',type:'feast'},
    {date:'2026-04-05',title:'+ Palm Sunday — Entry of the Lord into Jerusalem (Verbnitsa)',type:'feast'},
    {date:'2026-04-06',title:'* Great Monday — Holy Week',type:'service'},
    {date:'2026-04-07',title:'* Great Tuesday — Holy Week',type:'service'},
    {date:'2026-04-08',title:'* Great Wednesday — Holy Week',type:'service'},
    {date:'2026-04-09',title:'* Great Thursday — The Mystical Supper',type:'feast'},
    {date:'2026-04-10',title:'* Great Friday — Holy Passions of the Lord',type:'feast'},
    {date:'2026-04-11',title:'* Holy Saturday — Descent into Hell',type:'feast'},
    {date:'2026-04-12',title:'+ PASCHA — RESURRECTION OF CHRIST (HOLY EASTER)',type:'feast'},
    {date:'2026-04-13',title:'+ Bright Monday — Paschal Services Continue',type:'feast'},
    {date:'2026-04-14',title:'Bright Tuesday',type:'service'},
    {date:'2026-04-15',title:'Bright Wednesday',type:'service'},
    {date:'2026-04-16',title:'Bright Thursday',type:'service'},
    {date:'2026-04-17',title:'* Bright Friday — Life-giving Spring of the Theotokos',type:'service'},
    {date:'2026-04-18',title:'Bright Saturday',type:'service'},
    {date:'2026-04-19',title:'+ Thomas Sunday (Tomina)',type:'feast'},
    {date:'2026-04-25',title:'* Holy Apostle and Evangelist Mark',type:'feast'},
    {date:'2026-04-26',title:'+ Sunday of the Myrrh-bearing Women',type:'feast'},
    {date:'2026-04-30',title:'* Holy Apostle James the son of Zebedee',type:'feast'},
    // MAY
    {date:'2026-05-02',title:'* Tsar Boris-Michael, Equal-to-the-Apostles / St. Athanasius the Great',type:'feast'},
    {date:'2026-05-03',title:'+ Sunday of the Paralytic (4th after Pascha)',type:'feast'},
    {date:'2026-05-06',title:'+ Holy Great-Martyr George the Victorious (Gergyovden)',type:'feast'},
    {date:'2026-05-08',title:'* Holy Apostle and Evangelist John the Theologian',type:'feast'},
    {date:'2026-05-09',title:'* Translation of Relics of St. Nicholas of Myra',type:'feast'},
    {date:'2026-05-10',title:'+ Sunday of the Samaritan Woman (5th after Pascha)',type:'feast'},
    {date:'2026-05-11',title:'+ Sts. Cyril & Methody — PATRON SAINTS DAY',type:'feast'},
    {date:'2026-05-17',title:'+ Sunday of the Man Born Blind (6th after Pascha)',type:'feast'},
    {date:'2026-05-20',title:'* Apodosis of Pascha / Martyr Thalelaeus',type:'service'},
    {date:'2026-05-21',title:'+ ASCENSION OF THE LORD (Spasovden)',type:'feast'},
    {date:'2026-05-24',title:'+ 7th Sunday after Pascha / Day of Bulgarian Alphabet & Culture',type:'feast'},
    {date:'2026-05-25',title:'* 3rd Finding of the Head of St. John the Baptist',type:'feast'},
    {date:'2026-05-29',title:'Apodosis of the Ascension',type:'service'},
    {date:'2026-05-30',title:'Soul Saturday (Zadushtnitsa)',type:'service'},
    {date:'2026-05-31',title:'+ PENTECOST — DESCENT OF THE HOLY SPIRIT',type:'feast'},
    // JUNE
    {date:'2026-06-01',title:'+ Day of the Holy Spirit / Martyr Justin Philosopher',type:'feast'},
    {date:'2026-06-07',title:'+ Sunday of All Saints (1st after Pentecost)',type:'feast'},
    {date:'2026-06-08',title:'Beginning of the Apostles\' Fast (Petrovi Posti)',type:'service'},
    {date:'2026-06-11',title:'* Holy Apostles Bartholomew and Barnabas',type:'feast'},
    {date:'2026-06-14',title:'+ Sunday of All Bulgarian Saints (2nd after Pentecost)',type:'feast'},
    {date:'2026-06-19',title:'* Venerable Paisius of Hilendar (Paisiy Hilendarski)',type:'feast'},
    {date:'2026-06-20',title:'* Venerable Naum of Ohrid',type:'feast'},
    {date:'2026-06-21',title:'Divine Liturgy (3rd Sunday after Pentecost)',type:'service'},
    {date:'2026-06-24',title:'* Nativity of St. John the Baptist (Enyovden)',type:'feast'},
    {date:'2026-06-25',title:'* Hieromartyr Procopius of Varna',type:'feast'},
    {date:'2026-06-28',title:'Divine Liturgy (4th Sunday after Pentecost)',type:'service'},
    {date:'2026-06-29',title:'+ Holy Apostles Peter and Paul (Petrovden)',type:'feast'},
    {date:'2026-06-30',title:'* Assembly of the Holy Glorious 12 Apostles',type:'feast'},
    // JULY
    {date:'2026-07-01',title:'* Return of Relics of St. John of Rila, Wonderworker',type:'feast'},
    {date:'2026-07-05',title:'Divine Liturgy (5th Sunday after Pentecost)',type:'service'},
    {date:'2026-07-07',title:'* Holy Great-Martyr Nedelya (Kyriaki)',type:'feast'},
    {date:'2026-07-11',title:'* Holy Great-Martyr Euphemia the All-praised',type:'feast'},
    {date:'2026-07-12',title:'Divine Liturgy (6th Sunday after Pentecost)',type:'service'},
    {date:'2026-07-17',title:'* Holy Great-Martyr Marina',type:'feast'},
    {date:'2026-07-19',title:'Divine Liturgy (7th Sunday after Pentecost)',type:'service'},
    {date:'2026-07-20',title:'+ Holy Prophet Elijah (Ilinden / Elijah\'s Day)',type:'feast'},
    {date:'2026-07-26',title:'Divine Liturgy (8th Sunday after Pentecost)',type:'service'},
    {date:'2026-07-27',title:'* Holy Great-Martyr Panteleimon / Holy Seven-Numbered Saints (Sedmochislenitsi)',type:'feast'},
    // AUGUST
    {date:'2026-08-01',title:'* Procession of the Precious Cross — Beginning of Dormition Fast',type:'feast'},
    {date:'2026-08-02',title:'Divine Liturgy (9th Sunday after Pentecost)',type:'service'},
    {date:'2026-08-06',title:'+ TRANSFIGURATION OF THE LORD',type:'feast'},
    {date:'2026-08-09',title:'Divine Liturgy (10th Sunday after Pentecost)',type:'service'},
    {date:'2026-08-15',title:'+ DORMITION OF THE MOST HOLY THEOTOKOS',type:'feast'},
    {date:'2026-08-16',title:'Divine Liturgy (11th Sunday after Pentecost)',type:'service'},
    {date:'2026-08-18',title:'* Dormition of Venerable John of Rila, Wonderworker',type:'feast'},
    {date:'2026-08-23',title:'Divine Liturgy (12th Sunday after Pentecost)',type:'service'},
    {date:'2026-08-29',title:'* Beheading of St. John the Baptist and Forerunner (Fast)',type:'feast'},
    {date:'2026-08-30',title:'Divine Liturgy (13th Sunday after Pentecost)',type:'service'},
    // SEPTEMBER
    {date:'2026-09-01',title:'* Beginning of the Indiction — Ecclesiastical New Year',type:'feast'},
    {date:'2026-09-06',title:'Divine Liturgy (14th Sunday after Pentecost)',type:'service'},
    {date:'2026-09-08',title:'+ Nativity of the Most Holy Theotokos',type:'feast'},
    {date:'2026-09-13',title:'Sunday before the Exaltation / Renewal of Church of Resurrection',type:'service'},
    {date:'2026-09-14',title:'+ Exaltation of the Precious & Life-giving Cross (Krastovden)',type:'feast'},
    {date:'2026-09-16',title:'* Holy Great-Martyr Euphemia / St. Ludmila of Bohemia',type:'feast'},
    {date:'2026-09-17',title:'* Holy Martyrs Faith, Hope, Love and their mother Sophia',type:'feast'},
    {date:'2026-09-20',title:'+ Sunday after the Exaltation',type:'feast'},
    {date:'2026-09-23',title:'* Conception of St. John the Baptist and Forerunner',type:'feast'},
    {date:'2026-09-25',title:'* Venerable Sergius of Radonezh, Wonderworker',type:'feast'},
    {date:'2026-09-26',title:'* Dormition of Holy Apostle and Evangelist John the Theologian',type:'feast'},
    {date:'2026-09-27',title:'Divine Liturgy (1st Sunday after Exaltation Sunday)',type:'service'},
    // OCTOBER
    {date:'2026-10-01',title:'* Protection (Pokrov) of the Most Holy Theotokos',type:'feast'},
    {date:'2026-10-04',title:'Divine Liturgy (2nd Sunday after Exaltation)',type:'service'},
    {date:'2026-10-06',title:'* Holy Apostle Thomas',type:'feast'},
    {date:'2026-10-11',title:'Divine Liturgy — Holy Fathers of the 7th Ecumenical Council',type:'feast'},
    {date:'2026-10-14',title:'* Venerable Paraskeva (Petka) of Tarnovo (Petkovden)',type:'feast'},
    {date:'2026-10-18',title:'Divine Liturgy / * Holy Apostle and Evangelist Luke',type:'feast'},
    {date:'2026-10-19',title:'+ Venerable John of Rila, Wonderworker (Rilski Chudotvorets)',type:'feast'},
    {date:'2026-10-21',title:'* Venerable Hilarion the Great',type:'feast'},
    {date:'2026-10-22',title:'* Glorification of Relics of St. Euthymius, Patriarch of Tarnovo',type:'feast'},
    {date:'2026-10-25',title:'Divine Liturgy (6th Sunday after Exaltation)',type:'service'},
    {date:'2026-10-26',title:'+ Holy Great-Martyr Demetrius the Myrrh-gusher (Dimitrovden)',type:'feast'},
    {date:'2026-10-27',title:'* Martyr Nestor / Venerable Demetrius of Bassarbovo',type:'feast'},
    // NOVEMBER
    {date:'2026-11-01',title:'Divine Liturgy / Holy Unmercenaries Cosmas and Damian',type:'service'},
    {date:'2026-11-07',title:'Soul Saturday (Zadushtnitsa)',type:'service'},
    {date:'2026-11-08',title:'+ Assembly of Holy Archangel Michael (Archangelovden)',type:'feast'},
    {date:'2026-11-09',title:'* St. Nectarius, Bishop of Aegina, Wonderworker',type:'feast'},
    {date:'2026-11-13',title:'* St. John Chrysostom, Archbishop of Constantinople',type:'feast'},
    {date:'2026-11-14',title:'* Holy Apostle Philip / Christmas Fast Eve (Rozhdestveni Zagovezni)',type:'feast'},
    {date:'2026-11-15',title:'Divine Liturgy — Beginning of Christmas (Nativity) Fast',type:'service'},
    {date:'2026-11-21',title:'+ Entry (Presentation) of the Most Holy Theotokos into the Temple',type:'feast'},
    {date:'2026-11-22',title:'Divine Liturgy (9th Sunday after Exaltation)',type:'service'},
    {date:'2026-11-23',title:'* Blessed Prince Alexander Nevsky',type:'feast'},
    {date:'2026-11-24',title:'* Holy Great-Martyr Catherine',type:'feast'},
    {date:'2026-11-25',title:'* St. Clement, Pope of Rome / St. Clement, Archbishop of Ohrid',type:'feast'},
    {date:'2026-11-27',title:'* Venerable Theodosius of Tarnovo',type:'feast'},
    {date:'2026-11-29',title:'Divine Liturgy (13th Sunday after Exaltation)',type:'service'},
    {date:'2026-11-30',title:'* Holy Apostle Andrew the First-called (Andreevden)',type:'feast'},
    // DECEMBER
    {date:'2026-12-04',title:'* Holy Great-Martyr Barbara / Venerable John of Damascus (Varvarovden)',type:'feast'},
    {date:'2026-12-05',title:'* Venerable Sava the Sanctified',type:'feast'},
    {date:'2026-12-06',title:'+ St. Nicholas, Archbishop of Myra, Wonderworker (Nikulden)',type:'feast'},
    {date:'2026-12-09',title:'* Conception of St. Anna',type:'feast'},
    {date:'2026-12-12',title:'* St. Spyridon, Bishop of Trimythus, Wonderworker',type:'feast'},
    {date:'2026-12-13',title:'Divine Liturgy — Sunday of the Holy Forefathers',type:'feast'},
    {date:'2026-12-19',title:'Hieromartyr Ignatius the God-bearer (Ignazhden)',type:'service'},
    {date:'2026-12-20',title:'Divine Liturgy — Sunday before the Nativity of Christ',type:'feast'},
    {date:'2026-12-24',title:'+ Christmas Eve Vespers — Royal Hours (Badni Vecher)',type:'feast'},
    {date:'2026-12-25',title:'+ NATIVITY OF CHRIST — CHRISTMAS (Koleda)',type:'feast'},
    {date:'2026-12-26',title:'+ Assembly of the Most Holy Theotokos',type:'feast'},
    {date:'2026-12-27',title:'+ St. Stephen the First-Martyr (Stefanovden)',type:'feast'},
    {date:'2026-12-31',title:'Apodosis of the Nativity / Venerable Melania of Rome',type:'service'},
  ];

  // Build lookup for fast date checks
  var eventMap = {};
  churchEvents.forEach(function (ev) {
    if (!eventMap[ev.date]) eventMap[ev.date] = [];
    eventMap[ev.date].push(ev);
  });

  // ============================================================
  // DETAILED MONTHLY EVENTS (for dynamic right panel)
  // keyed by month index 0–11
  // ============================================================
  var detailedEvents = {
    0: [ // January
      {day:1,title:'New Year — Circumcision of the Lord / St. Basil the Great',time:'Divine Liturgy 10:30 AM',desc:'The civil New Year coincides with the feast of the Circumcision of Christ and the memory of St. Basil the Great. Liturgy of St. Basil the Great is served.',type:'feast'},
      {day:6,title:'+ Holy Theophany — Epiphany (Yordanovden)',time:'Divine Liturgy 10:30 AM | Great Blessing of Waters',desc:'One of the Twelve Great Feasts. Celebrates the Baptism of Christ in the Jordan River. The Great Blessing of Waters is performed. Yordanovden is celebrated by all who bear the name Jordan.',type:'feast'},
      {day:7,title:'St. John the Baptist (Ivanovden)',time:'Divine Liturgy 10:30 AM',desc:'The day after Theophany honours the Holy Forerunner and Baptist of the Lord, St. John. Ivanovden is celebrated by all who bear the name Ivan / John.',type:'feast'},
      {day:17,title:'* Venerable Anthony the Great (Antonovden)',time:'Divine Liturgy 10:30 AM',desc:'Father of monasticism and one of the great ascetics of the Church. Antonovden is celebrated by all who bear the name Anton / Antonia.',type:'feast'},
      {day:30,title:'* Three Hierarchs: Basil, Gregory, John Chrysostom',time:'Divine Liturgy 10:30 AM',desc:'Joint feast of the three great Ecumenical Teachers and Hierarchs — St. Basil the Great, St. Gregory the Theologian, and St. John Chrysostom.',type:'feast'},
    ],
    1: [ // February
      {day:2,title:'+ Presentation of the Lord in the Temple (Candlemas)',time:'Divine Liturgy 10:30 AM',desc:'One of the Twelve Great Feasts. Commemorates the presentation of the infant Christ in the Temple and the meeting with Righteous Simeon the God-receiver.',type:'feast'},
      {day:10,title:'* Hieromartyr Charalampus the Wonderworker',time:'Divine Liturgy 10:30 AM',desc:'Venerable bishop and martyr renowned for many miracles. His memory is celebrated with special devotion throughout the Bulgarian Orthodox Church.',type:'feast'},
      {day:14,title:'* Dormition of St. Cyril the Slavo-Bulgarian Enlightener',time:'Divine Liturgy 10:30 AM',desc:'St. Cyril (826–869), together with his brother St. Methodius, created the Glagolitic alphabet and brought Christianity and literacy to the Slavic peoples.',type:'feast'},
      {day:22,title:'Forgiveness Sunday — Cheesefare (Sirni Zagovezni)',time:'Divine Liturgy 10:30 AM | Rite of Forgiveness Vespers 6:00 PM',desc:'The last Sunday before Great Lent. After Vespers, the Rite of Mutual Forgiveness is performed. Great Lent begins the following Monday.',type:'feast'},
      {day:23,title:'Beginning of Great Lent — Clean Monday',time:'Great Compline 6:00 PM',desc:'The first day of Great Lent. Great Compline with the Canon of St. Andrew of Crete (Part I) is served in the evening. A period of intensified fasting and prayer begins.',type:'service'},
      {day:28,title:'* Theodore Saturday',time:'Divine Liturgy 10:30 AM',desc:'The first Saturday of Great Lent. The memory of the Holy Great-Martyr Theodore the Recruit is celebrated. Koliva (boiled wheat) is blessed in his memory.',type:'feast'},
    ],
    2: [ // March
      {day:1,title:'1st Sunday of Great Lent — Sunday of Orthodoxy',time:'Divine Liturgy 10:30 AM | Supplication Service',desc:'The first Sunday of Great Lent commemorates the Triumph of Orthodoxy over iconoclasm at the 7th Ecumenical Council (787 AD). A procession with holy icons is held.',type:'feast'},
      {day:3,title:'Liberation of Bulgaria — National Holiday',time:'Supplication Service after Liturgy',desc:'Bulgaria\'s Liberation from Ottoman rule (March 3, 1878). A special supplication service (molieben) is served after the Divine Liturgy.',type:'community'},
      {day:9,title:'* Holy 40 Martyrs of Sebaste',time:'Divine Liturgy 10:30 AM',desc:'Forty soldiers who refused to renounce Christ and were left to freeze in a lake in Sebaste, Armenia (320 AD). A beloved Bulgarian feast day.',type:'feast'},
      {day:15,title:'3rd Sunday of Great Lent — Veneration of the Holy Cross',time:'Divine Liturgy 10:30 AM',desc:'The Holy Cross is brought to the center of the church for veneration by the faithful. Gives spiritual strength for the remaining weeks of the Lenten Fast.',type:'feast'},
      {day:25,title:'+ Annunciation of the Most Holy Theotokos (Blagoveshteniye)',time:'Divine Liturgy 10:30 AM',desc:'One of the Twelve Great Feasts. Celebrates the Archangel Gabriel\'s announcement to the Virgin Mary that she would bear the Son of God. Fish is permitted on this day.',type:'feast'},
      {day:28,title:'* Akathist Saturday',time:'Divine Liturgy 10:30 AM',desc:'The 5th Saturday of Great Lent. The Akathist Hymn to the Most Holy Theotokos — one of the greatest hymns of the Orthodox Church — is chanted in its entirety.',type:'feast'},
      {day:29,title:'5th Sunday of Great Lent — Venerable Mary of Egypt',time:'Divine Liturgy 10:30 AM',desc:'The life of St. Mary of Egypt — the great penitent who spent 47 years in the desert — is read at Matins, inspiring repentance as Holy Week approaches.',type:'feast'},
    ],
    3: [ // April
      {day:4,title:'* Lazarus Saturday',time:'Divine Liturgy 10:30 AM',desc:'The Saturday before Palm Sunday. Celebrates the raising of Lazarus from the dead — a foretaste of the Lord\'s Resurrection. The Paschal troparion is chanted for the first time.',type:'feast'},
      {day:5,title:'+ Palm Sunday — Entry of the Lord into Jerusalem (Verbnitsa)',time:'Divine Liturgy 10:30 AM | Evening Bridegroom Matins 6:00 PM',desc:'One of the Twelve Great Feasts. Willows and palm branches are blessed and distributed to the faithful. Holy Week begins with Bridegroom Matins in the evening.',type:'feast'},
      {day:6,title:'* Great Monday — Holy Week',time:'Presanctified Liturgy 10:00 AM | Bridegroom Matins 6:00 PM',desc:'Holy Week begins. The service of Bridegroom Matins recalls the parable of the Wise and Foolish Virgins, calling the faithful to watchfulness.',type:'service'},
      {day:7,title:'* Great Tuesday — Holy Week',time:'Presanctified Liturgy 10:00 AM | Bridegroom Matins 6:00 PM',desc:'Great Tuesday recalls Christ\'s teachings in the Temple. Bridegroom Matins with the moving Troparion "Behold the Bridegroom" is sung.',type:'service'},
      {day:8,title:'* Great Wednesday — Holy Week',time:'Presanctified Liturgy & Unction 10:00 AM',desc:'The day of the woman who anointed Christ with myrrh. General Unction (Holy Oil) is offered to all the faithful for the healing of soul and body.',type:'service'},
      {day:9,title:'* Great Thursday — The Mystical Supper',time:'Liturgy of St. Basil 10:00 AM | 12 Gospels Service 6:00 PM',desc:'Commemorates the institution of the Holy Eucharist at the Last Supper. The Service of the 12 Gospels (Passion Gospels) is served in the evening.',type:'feast'},
      {day:10,title:'* Great Friday — Holy Passions of the Lord',time:'Royal Hours 10:00 AM | Vespers & Shroud 3:00 PM | Lamentations 6:00 PM',desc:'The most solemn day of the Orthodox year. The Epitaphios (Holy Shroud) is brought out for veneration. The moving Lamentations service is served in the evening.',type:'feast'},
      {day:11,title:'* Holy Saturday — Descent into Hell',time:'Vesperal Liturgy of St. Basil 10:00 AM | Resurrection Matins 11:00 PM',desc:'The great and holy silence. The vesperal Liturgy of St. Basil is served in the morning. The Resurrection service begins at 11:00 PM.',type:'feast'},
      {day:12,title:'+ PASCHA — RESURRECTION OF CHRIST',time:'Midnight: 11:00 PM | Paschal Liturgy: 10:30 AM',desc:'The Feast of Feasts — the Resurrection of our Lord Jesus Christ. Christos Voskrese! — Христос Воскресе! The midnight Resurrection service is the most joyful of the entire year.',type:'feast'},
      {day:19,title:'+ Thomas Sunday (Tomina)',time:'Divine Liturgy 10:30 AM',desc:'The Sunday after Pascha. Recalls the appearance of the Risen Christ to the Apostle Thomas. Also called "Tomina" or "Антипасха."',type:'feast'},
      {day:26,title:'+ Sunday of the Myrrh-bearing Women',time:'Divine Liturgy 10:30 AM',desc:'The third Sunday after Pascha honours the holy women who came to anoint the body of Christ and were the first to receive news of the Resurrection.',type:'feast'},
    ],
    4: [ // May
      {day:6,title:'+ Holy Great-Martyr George the Victorious (Gergyovden)',time:'Divine Liturgy 10:30 AM',desc:'One of the most beloved feasts in the Bulgarian Orthodox tradition. Gergyovden is celebrated by all who bear the name Georgi / Georgia. Traditional blessing of lambs.',type:'feast'},
      {day:8,title:'* Holy Apostle and Evangelist John the Theologian',time:'Divine Liturgy 10:30 AM',desc:'Feast of the beloved disciple of Christ, author of the Fourth Gospel, the Epistles, and the Book of Revelation. He is the only Apostle who died a natural death.',type:'feast'},
      {day:11,title:'+ PATRON SAINTS DAY — Sts. Cyril & Methody',time:'Divine Liturgy 10:30 AM | Festive Banquet TBA',desc:'The most important celebration in our parish calendar! Our patron saints Ss. Cyril and Methody created the Slavic alphabet and evangelized the Slavic peoples. Solemn Divine Liturgy followed by a festive community banquet. ALL are warmly welcome!',type:'feast'},
      {day:21,title:'+ Ascension of the Lord (Spasovden)',time:'Divine Liturgy 10:30 AM',desc:'One of the Twelve Great Feasts. Forty days after Pascha, Christ ascends to Heaven in glory at the Mount of Olives. Spasovden is celebrated across the Bulgarian Orthodox tradition.',type:'feast'},
      {day:24,title:'Day of Bulgarian Alphabet, Culture & Slavic Literature',time:'Special Service after Liturgy',desc:'National holiday commemorating the creation of the Slavic alphabet by Sts. Cyril and Methody. A supplication service is served at our cathedral in honour of the Holy Brothers.',type:'community'},
      {day:30,title:'Soul Saturday (Zadushtnitsa)',time:'Liturgy & Panakhida 10:30 AM',desc:'A day of prayer for the departed. The faithful bring koliva (boiled wheat) and candles to the church. A Panakhida (Memorial Service) is served for all the departed Orthodox Christians.',type:'service'},
      {day:31,title:'+ PENTECOST — Descent of the Holy Spirit',time:'Divine Liturgy 10:30 AM | Kneeling Vespers following',desc:'One of the Twelve Great Feasts and the Birthday of the Church. Fifty days after Pascha, the Holy Spirit descends upon the Apostles. Kneeling Vespers with three special prayers for the living and departed is served immediately after Liturgy.',type:'feast'},
    ],
    5: [ // June
      {day:1,title:'+ Day of the Holy Spirit',time:'Divine Liturgy 10:30 AM',desc:'The Monday after Pentecost honours the Holy Spirit, the Third Person of the Holy Trinity. The Apostles\' Fast eve falls on the following Sunday.',type:'feast'},
      {day:7,title:'+ Sunday of All Saints — Apostles\' Fast Eve',time:'Divine Liturgy 10:30 AM | Vespers 6:00 PM',desc:'The first Sunday after Pentecost honours all saints who have pleased God. After Vespers the Apostles\' Fast (Petrovi Zagovezni) begins — the fast in honour of Sts. Peter and Paul.',type:'feast'},
      {day:8,title:'Beginning of the Apostles\' Fast (Petrovi Posti)',time:'Continues until June 28',desc:'The Apostles\' Fast honours the holy Apostles and commemorates the period they spent in prayer and fasting before going out to preach the Gospel. Fasting from meat, dairy, fish (on some days).',type:'service'},
      {day:14,title:'+ Sunday of All Bulgarian Saints',time:'Divine Liturgy 10:30 AM',desc:'The second Sunday after Pentecost honours all the saints who shone forth in the lands of Bulgaria — martyrs, monastics, hierarchs, and righteous ones. A uniquely Bulgarian celebration.',type:'feast'},
      {day:19,title:'* Venerable Paisius of Hilendar (Paisiy Hilendarski)',time:'Divine Liturgy 10:30 AM',desc:'Venerable Paisius (1722–1773), monk of the Hilendar Monastery on Mt. Athos, wrote the "Istoriya Slavyanobolgarskaya" (Slavic-Bulgarian History), igniting the Bulgarian National Revival.',type:'feast'},
      {day:24,title:'* Nativity of St. John the Baptist (Enyovden)',time:'Divine Liturgy 10:30 AM',desc:'Celebrates the birth of the Holy Forerunner. Enyovden is one of the oldest Bulgarian folk-church celebrations, falling near the summer solstice. Celebrated by all named Ivan/Yana.',type:'feast'},
      {day:29,title:'+ Holy Apostles Peter and Paul (Petrovden)',time:'Divine Liturgy 10:30 AM',desc:'One of the great feast days. Celebrates the Holy First-Supreme Apostles Peter and Paul. The Apostles\' Fast ends on this day. Petrovden is celebrated by all named Petar / Pavlina.',type:'feast'},
    ],
    6: [ // July
      {day:1,title:'* Return of Relics of St. John of Rila, Wonderworker',time:'Divine Liturgy 10:30 AM',desc:'Celebrates the return of the relics of Bulgaria\'s greatest saint, St. John of Rila (876–946), to Rila Monastery in 1469. His primary feast is October 19.',type:'feast'},
      {day:7,title:'* Holy Great-Martyr Nedelya (Kyriaki)',time:'Divine Liturgy 10:30 AM',desc:'Holy Great-Martyr Nedelya (Sunday in Bulgarian) is a beloved Bulgarian saint. Her memory is celebrated with particular devotion in Macedonia and throughout Bulgaria.',type:'feast'},
      {day:20,title:'+ Holy Prophet Elijah (Ilinden / Elijah\'s Day)',time:'Divine Liturgy 10:30 AM',desc:'One of the most beloved summer feasts. The Prophet Elijah is honoured as a great Old Testament prophet who was taken to heaven in a fiery chariot. Ilinden is celebrated across the Bulgarian lands.',type:'feast'},
      {day:27,title:'* Holy Great-Martyr Panteleimon the Healer',time:'Divine Liturgy 10:30 AM',desc:'Holy Great-Martyr Panteleimon is one of the Holy Unmercenary Healers. He is venerated as a patron of physicians and the sick. A special service with anointing may be held.',type:'feast'},
    ],
    7: [ // August
      {day:1,title:'* Procession of the Precious Cross — Beginning of Dormition Fast',time:'Divine Liturgy 10:30 AM | Blessing of Waters',desc:'The August 1st Feast begins the two-week Dormition Fast preceding the feast of the Dormition of the Theotokos on August 15. The Precious Cross is brought out for veneration.',type:'feast'},
      {day:6,title:'+ TRANSFIGURATION OF THE LORD',time:'Divine Liturgy 10:30 AM | Blessing of Grapes & Fruit',desc:'One of the Twelve Great Feasts. Christ is transfigured on Mount Tabor before Peter, James, and John. Following the tradition, grapes and other first fruits are blessed at the Liturgy.',type:'feast'},
      {day:15,title:'+ DORMITION OF THE MOST HOLY THEOTOKOS',time:'Divine Liturgy 10:30 AM',desc:'One of the Twelve Great Feasts — the "Pascha of Summer." Commemorates the falling asleep of the Virgin Mary and her assumption into heaven. Preceded by the two-week Dormition Fast.',type:'feast'},
      {day:18,title:'* Dormition of Venerable John of Rila, Wonderworker',time:'Divine Liturgy 10:30 AM',desc:'Commemorates the falling asleep of Bulgaria\'s patron saint, St. John of Rila (876–946). He spent decades in the Rila Mountains as a hermit and founded the Rila Monastery.',type:'feast'},
      {day:29,title:'* Beheading of St. John the Baptist (Fast)',time:'Divine Liturgy 10:30 AM',desc:'A strict fast day commemorating the martyrdom of the Holy Forerunner at the hands of Herod Antipas. A day of prayer and fasting out of reverence for the saint.',type:'feast'},
    ],
    8: [ // September
      {day:1,title:'* Ecclesiastical New Year — Beginning of the Indiction',time:'Divine Liturgy 10:30 AM',desc:'The Orthodox Church marks the new ecclesiastical year on September 1st. A special service gives thanks for the year past and asks God\'s blessing for the new year.',type:'feast'},
      {day:8,title:'+ Nativity of the Most Holy Theotokos',time:'Divine Liturgy 10:30 AM',desc:'One of the Twelve Great Feasts. Celebrates the birth of the Virgin Mary to righteous Joachim and Anna. This feast begins the new liturgical cycle of the Church year.',type:'feast'},
      {day:14,title:'+ Exaltation of the Precious & Life-giving Cross (Krastovden)',time:'Divine Liturgy 10:30 AM (Strict Fast)',desc:'One of the Twelve Great Feasts. Commemorates the discovery of the True Cross by St. Helen in Jerusalem (326 AD). A strict fast is observed on this day. The Cross is brought to the center of the church for veneration.',type:'feast'},
      {day:17,title:'* Holy Martyrs Faith, Hope, Love and their mother Sophia',time:'Divine Liturgy 10:30 AM',desc:'Three young sisters and their mother who suffered martyrdom for their faith in Rome in the 2nd century. A popular name-day for many Bulgarian women.',type:'feast'},
      {day:26,title:'* Dormition of Holy Apostle John the Theologian',time:'Divine Liturgy 10:30 AM',desc:'Commemorates the falling asleep of the beloved Apostle John. Uniquely, the earth reportedly trembled and gave forth a fragrant myrrh at his grave.',type:'feast'},
    ],
    9: [ // October
      {day:1,title:'* Protection (Pokrov) of the Most Holy Theotokos',time:'Divine Liturgy 10:30 AM',desc:'Celebrates the miraculous appearance of the Theotokos in the Blachernae Church in Constantinople (910 AD), spreading her veil (omophorion) over the faithful as a sign of her protection.',type:'feast'},
      {day:14,title:'* Venerable Paraskeva (Petka) of Tarnovo (Petkovden)',time:'Divine Liturgy 10:30 AM',desc:'Bulgaria\'s most beloved female saint. Born in Epivaton (near modern Istanbul), she lived as an ascetic and her holy relics now rest in Iasi, Romania. Petkovden is celebrated by all named Petra / Petya.',type:'feast'},
      {day:19,title:'+ Venerable John of Rila, Wonderworker',time:'Divine Liturgy 10:30 AM',desc:'The primary feast of Bulgaria\'s patron saint, St. John of Rila (876–946). He is the greatest Bulgarian ascetic and wonderworker, founder of the Rila Monastery. A solemn service is served.',type:'feast'},
      {day:26,title:'+ Holy Great-Martyr Demetrius the Myrrh-gusher (Dimitrovden)',time:'Divine Liturgy 10:30 AM',desc:'One of the great feast days beloved in the Bulgarian tradition. The eve of Dimitrovden (Oct. 25) is a Soul Saturday, when we pray for our departed. Celebrated by all named Dimitar / Dimitrina.',type:'feast'},
    ],
    10: [ // November
      {day:8,title:'+ Assembly of Holy Archangel Michael (Archangelovden)',time:'Divine Liturgy 10:30 AM',desc:'Feast of the Bodiless Powers — the Holy Angels — led by the Archangel Michael. Archangelovden is one of the most celebrated name-days in Bulgaria.',type:'feast'},
      {day:13,title:'* St. John Chrysostom, Archbishop of Constantinople',time:'Divine Liturgy 10:30 AM',desc:'One of the greatest Fathers of the Church, composer of the Divine Liturgy most frequently used by the Orthodox Church. Known as "Golden-Mouthed" for his brilliant preaching.',type:'feast'},
      {day:14,title:'* Holy Apostle Philip — Christmas Fast Eve (Rozhdestveni Zagovezni)',time:'Divine Liturgy 10:30 AM',desc:'The feast of the Apostle Philip is also the eve of the Nativity (Christmas) Fast. Beginning November 15, the Church enters a 40-day period of fasting in preparation for Christmas.',type:'feast'},
      {day:21,title:'+ Entry (Presentation) of the Most Holy Theotokos into the Temple',time:'Divine Liturgy 10:30 AM',desc:'One of the Twelve Great Feasts. At age three, the Virgin Mary was presented in the Jerusalem Temple, where she was received by the High Priest Zacharias and lived until her betrothal.',type:'feast'},
      {day:25,title:'* St. Clement, Pope of Rome / St. Clement, Archbishop of Ohrid',time:'Divine Liturgy 10:30 AM',desc:'Double feast: St. Clement of Rome (1st century) and St. Clement of Ohrid (840–916), disciple of Sts. Cyril and Methody and first Bishop of the Bulgarian people.',type:'feast'},
      {day:30,title:'* Holy Apostle Andrew the First-called (Andreevden)',time:'Divine Liturgy 10:30 AM',desc:'The first of the twelve Apostles to follow Christ. St. Andrew preached in Thrace and along the Black Sea coast (present-day Bulgaria). Andreevden is celebrated by all named Andrei / Andrea.',type:'feast'},
    ],
    11: [ // December
      {day:4,title:'* Holy Great-Martyr Barbara (Varvarovden)',time:'Divine Liturgy 10:30 AM',desc:'Holy Great-Martyr Barbara is venerated as a patroness of the dying, ensuring they receive the Sacraments. Varvarovden is celebrated by all named Varvara / Barbara.',type:'feast'},
      {day:6,title:'+ St. Nicholas, Archbishop of Myra, Wonderworker (Nikulden)',time:'Divine Liturgy 10:30 AM',desc:'One of the most beloved saints in both Orthodox and Western Christianity. A great wonderworker and protector of children, sailors, and the poor. Nikulden is celebrated by all named Nikola / Nikolina.',type:'feast'},
      {day:12,title:'* St. Spyridon, Bishop of Trimythus, Wonderworker',time:'Divine Liturgy 10:30 AM',desc:'A great shepherd and wonderworker who participated in the First Ecumenical Council. His miraculous relics rest on the island of Corfu, Greece, exuding a fragrant myrrh.',type:'feast'},
      {day:19,title:'Hieromartyr Ignatius the God-bearer (Ignazhden)',time:'Special Lenten Vespers 6:00 PM',desc:'St. Ignatius of Antioch, disciple of the Apostle John, was martyred in Rome c. 107 AD. Ignazhden is one of the Bulgarian folk-church customs marking the approach of Christmas.',type:'service'},
      {day:24,title:'Christmas Eve — Royal Hours & Vespers (Badni Vecher)',time:'Royal Hours 10:00 AM | Vesperal Liturgy 6:00 PM',desc:'The eve of the Nativity of Christ. The Royal Hours and Vesperal Liturgy of St. Basil are served. By tradition, a Yule log (Badnik) is brought into the home and twelve-dish meatless supper is shared.',type:'feast'},
      {day:25,title:'+ NATIVITY OF CHRIST — CHRISTMAS (Koleda)',time:'Divine Liturgy 10:30 AM',desc:'One of the Twelve Great Feasts — the Incarnation of the Son of God. Christ is born in Bethlehem of Judea. Christos se Rodi! — Voistinu se Rodi! The most joyful feast of the winter.',type:'feast'},
      {day:27,title:'+ St. Stephen the First-Martyr (Stefanovden)',time:'Divine Liturgy 10:30 AM',desc:'The Sunday after Christmas honours the first Christian martyr, the Deacon Stephen. Stefanovden is celebrated by all named Stefan / Stefania. The Paschal joy continues through the twelve days of Christmas.',type:'feast'},
    ]
  };

  // ============================================================
  // MONTHLY NEWS ARTICLES (for dynamic index.html news section)
  // keyed by month index 0–11
  // ============================================================
  var monthlyNews = [
    // 0 — January
    [{title:'Theophany 2026: The Great Blessing of Waters',date:'January 6, 2026',img:'assets/images/hero/church_photo.jpg',text:'On January 6th our Cathedral celebrates the Great Feast of Theophany — the Baptism of the Lord. The Great Blessing of Waters is performed at the Divine Liturgy. All are invited.',link:'news.html#theophany-2026'},
     {title:'Three Hierarchs & January Feast Days',date:'January 30, 2026',img:'assets/images/hero/church_photo.jpg',text:'January is rich with great feast days: Theophany (Jan 6), St. John the Baptist (Jan 7), St. Anthony (Jan 17), and the Three Hierarchs (Jan 30).',link:'news.html#january-feasts-2026'},
     {title:'Cathedral Choir — New Members Welcome',date:'2026 — Open Auditions',img:'assets/images/gallery/school/school_large_01.jpg',text:'Share your musical gifts in service to the Lord. Cathedral Choir rehearsals every Sunday at 9:00 AM. Contact the church office for details.',link:'news.html#choir-2026'}],
    // 1 — February
    [{title:'Presentation of the Lord — Candlemas, February 2',date:'February 2, 2026',img:'assets/images/hero/church_photo.jpg',text:'The Great Feast of the Presentation of the Lord (Candlemas) falls on February 2. Candles are blessed and distributed to the faithful at the Divine Liturgy.',link:'news.html#candlemas-2026'},
     {title:'Forgiveness Sunday & Beginning of Great Lent',date:'February 22, 2026',img:'assets/images/hero/church_photo.jpg',text:'On February 22, Forgiveness Sunday (Sirni Zagovezni), we ask forgiveness from one another before Great Lent begins on Clean Monday, February 23.',link:'news.html#great-lent-2026'},
     {title:'Cathedral Choir — New Members Welcome',date:'2026 — Open Auditions',img:'assets/images/gallery/school/school_large_01.jpg',text:'Share your musical gifts in service to the Lord. Cathedral Choir rehearsals every Sunday at 9:00 AM. Contact the church office for details.',link:'news.html#choir-2026'}],
    // 2 — March
    [{title:'Great Lent 2026: A Season of Prayer & Repentance',date:'February 23 – April 11, 2026',img:'assets/images/hero/church_photo.jpg',text:'Great Lent is a 40-day journey of prayer, fasting, and repentance in preparation for Holy Pascha. Special Presanctified Liturgies are served on Wednesdays and Fridays.',link:'news.html#great-lent-2026'},
     {title:'Annunciation of the Theotokos — March 25',date:'March 25, 2026',img:'assets/images/hero/church_photo.jpg',text:'The Great Feast of the Annunciation falls on March 25. The Archangel Gabriel announces to the Virgin Mary the Incarnation of the Son of God. Fish is permitted on this day.',link:'news.html#annunciation-2026'},
     {title:'Patron Saints Day 2026 — Save the Date: May 11',date:'May 11, 2026',img:'assets/images/gallery/patrons-day/patrons_day_large_01.jpg',text:'Our most important parish celebration is approaching. Mark your calendars for the Patron Saints Day — Sts. Cyril & Methody — on May 11, 2026.',link:'news.html#patron-saints-day-2026'}],
    // 3 — April
    [{title:'Holy Week & Pascha 2026',date:'April 5–12, 2026',img:'assets/images/gallery/easter/easter_large_01.jpg',text:'Palm Sunday is April 5. Holy Week services begin: Bridegroom Matins (Mon–Wed), General Unction (Wed), Liturgy of St. Basil (Thu), Lamentations (Fri). Pascha is April 12.',link:'news.html#holy-week-2026'},
     {title:'Patron Saints Day 2026 — Save the Date: May 11',date:'May 11, 2026',img:'assets/images/gallery/patrons-day/patrons_day_large_01.jpg',text:'Our most important parish celebration is approaching. Mark your calendars for the Patron Saints Day — Sts. Cyril & Methody — on May 11, 2026. All parishioners and friends are warmly welcome.',link:'news.html#patron-saints-day-2026'},
     {title:'Cathedral Choir — New Members Welcome',date:'2026 — Open Auditions',img:'assets/images/gallery/school/school_large_01.jpg',text:'Share your musical gifts in service to the Lord. Cathedral Choir rehearsals every Sunday at 9:00 AM. Contact the church office for details.',link:'news.html#choir-2026'}],
    // 4 — May
    [{title:'Patron Saints Day 2026 — Sts. Cyril & Methody',date:'May 11, 2026',img:'assets/images/gallery/patrons-day/patrons_day_large_01.jpg',text:'Annual celebration honouring our patron saints with solemn Divine Liturgy and festive banquet. The most important day in our parish calendar. All are warmly welcome.',link:'news.html#patron-saints-day-2026'},
     {title:'Ascension of the Lord — May 21, 2026',date:'May 21, 2026',img:'assets/images/hero/church_photo.jpg',text:'The Great Feast of the Ascension of the Lord (Spasovden) falls on May 21 — forty days after Pascha. Divine Liturgy at 10:30 AM. All are invited.',link:'news.html#ascension-2026'},
     {title:'Day of Bulgarian Alphabet & Culture — May 24',date:'May 24, 2026',img:'assets/images/gallery/school/school_large_01.jpg',text:'On May 24 we celebrate the Day of the Bulgarian Alphabet, Education and Culture. A special supplication service is served after the Divine Liturgy in honour of Sts. Cyril & Methody.',link:'news.html#culture-day-2026'}],
    // 5 — June
    [{title:'Holy Pentecost 2026 — The Birthday of the Church',date:'May 31, 2026',img:'assets/images/gallery/easter/easter_large_01.jpg',text:'Pentecost falls on May 31 this year — fifty days after Pascha. The Descent of the Holy Spirit upon the Apostles. Kneeling Vespers with three special prayers follow the Liturgy.',link:'news.html#pentecost-2026'},
     {title:'Sunday of All Bulgarian Saints — June 14',date:'June 14, 2026',img:'assets/images/hero/church_photo.jpg',text:'The second Sunday after Pentecost honours all the saints who shone forth in the Bulgarian lands. A solemn Divine Liturgy is served in their memory.',link:'news.html#bulgarian-saints-2026'},
     {title:'Apostles\' Fast: June 8–28 — Petrovden July 29',date:'June 8–28, 2026',img:'assets/images/hero/church_photo.jpg',text:'The Apostles\' Fast (Petrovi Posti) begins June 8 and lasts until the feast of Sts. Peter and Paul on June 29. A time of fasting in honour of the Holy Apostles.',link:'news.html#apostles-fast-2026'}],
    // 6 — July
    [{title:'Prophet Elijah — Ilinden, July 20',date:'July 20, 2026',img:'assets/images/hero/church_photo.jpg',text:'The feast of the Holy Prophet Elijah (Ilinden) is one of the most beloved summer celebrations. The Prophet Elijah was taken to heaven in a fiery chariot without tasting death.',link:'news.html#ilinden-2026'},
     {title:'St. Panteleimon the Healer — July 27',date:'July 27, 2026',img:'assets/images/hero/church_photo.jpg',text:'Holy Great-Martyr Panteleimon, patron of physicians and the sick. A special service is served at our cathedral on July 27 in his honour.',link:'news.html#panteleimon-2026'},
     {title:'Summer Liturgy Schedule',date:'July–August 2026',img:'assets/images/hero/church_photo.jpg',text:'Divine Liturgy continues every Sunday at 10:30 AM throughout the summer. Contact the church office for information on weekday feast services.',link:'news.html#summer-schedule-2026'}],
    // 7 — August
    [{title:'Transfiguration of the Lord — August 6',date:'August 6, 2026',img:'assets/images/hero/church_photo.jpg',text:'The Great Feast of the Transfiguration — Christ is transfigured on Mt. Tabor before Peter, James, and John. By tradition, grapes and fruit are blessed at the Divine Liturgy.',link:'news.html#transfiguration-2026'},
     {title:'Dormition of the Theotokos — August 15',date:'August 15, 2026',img:'assets/images/hero/church_photo.jpg',text:'The Dormition (Assumption) of the Most Holy Theotokos — the "Pascha of Summer." Preceded by the two-week Dormition Fast (August 1–14). Divine Liturgy at 10:30 AM.',link:'news.html#dormition-2026'},
     {title:'Cathedral Choir — New Members Welcome',date:'2026 — Open Auditions',img:'assets/images/gallery/school/school_large_01.jpg',text:'Share your musical gifts in service to the Lord. Cathedral Choir rehearsals every Sunday at 9:00 AM. Contact the church office for details.',link:'news.html#choir-2026'}],
    // 8 — September
    [{title:'Exaltation of the Holy Cross — September 14',date:'September 14, 2026',img:'assets/images/hero/church_photo.jpg',text:'The Great Feast of the Exaltation of the Precious Cross (Krastovden). The Cross is brought to the center of the church for veneration. A strict fast is observed.',link:'news.html#exaltation-2026'},
     {title:'Nativity of the Theotokos — September 8',date:'September 8, 2026',img:'assets/images/hero/church_photo.jpg',text:'The Nativity of the Most Holy Theotokos opens the new cycle of the Church year. Divine Liturgy at 10:30 AM on September 8.',link:'news.html#nativity-theotokos-2026'},
     {title:'Autumn Events & Bazaar — Coming Soon',date:'October 2026',img:'assets/images/hero/church_photo.jpg',text:'Our beloved annual autumn community bazaar is approaching! Date to be announced. Watch the parish bulletin for details on this cherished community gathering.',link:'news.html#autumn-bazaar-2026'}],
    // 9 — October
    [{title:'St. John of Rila — October 19',date:'October 19, 2026',img:'assets/images/hero/church_photo.jpg',text:'The primary feast of Bulgaria\'s patron saint, Venerable John of Rila (876–946). Founder of Rila Monastery and greatest Bulgarian ascetic. Solemn Divine Liturgy at 10:30 AM.',link:'news.html#john-of-rila-2026'},
     {title:'St. Demetrius — Dimitrovden, October 26',date:'October 26, 2026',img:'assets/images/hero/church_photo.jpg',text:'Holy Great-Martyr Demetrius the Myrrh-gusher (Dimitrovden) is celebrated on October 26. Celebrated by all named Dimitar / Dimitrina. The eve (Oct. 25) is a Soul Saturday.',link:'news.html#dimitrovden-2026'},
     {title:'Annual Autumn Bazaar — October 2026',date:'October 2026 — Date TBA',img:'assets/images/hero/church_photo.jpg',text:'Our beloved annual community bazaar featuring Bulgarian foods, crafts, music, and fellowship. Watch the parish bulletin for the confirmed date.',link:'news.html#autumn-bazaar-2026'}],
    // 10 — November
    [{title:'Archangelovden — November 8',date:'November 8, 2026',img:'assets/images/hero/church_photo.jpg',text:'The feast of the Assembly of the Holy Archangel Michael and all Bodiless Powers. Archangelovden is one of Bulgaria\'s most celebrated name-days. Divine Liturgy at 10:30 AM.',link:'news.html#archangelovden-2026'},
     {title:'Presentation of the Theotokos — November 21',date:'November 21, 2026',img:'assets/images/hero/church_photo.jpg',text:'The Great Feast of the Entry of the Most Holy Theotokos into the Temple. The Virgin Mary at age three is presented in the Jerusalem Temple. Fish is permitted on this day.',link:'news.html#presentation-theotokos-2026'},
     {title:'Christmas Fast Begins — November 15',date:'November 15, 2026',img:'assets/images/hero/church_photo.jpg',text:'The Nativity (Christmas) Fast begins on November 15. A 40-day period of fasting and prayer in preparation for the Nativity of Christ on December 25.',link:'news.html#christmas-fast-2026'}],
    // 11 — December
    [{title:'St. Nicholas Day — Nikulden, December 6',date:'December 6, 2026',img:'assets/images/hero/church_photo.jpg',text:'The feast of St. Nicholas, Archbishop of Myra and great wonderworker. Nikulden is one of the most beloved Bulgarian feasts. Celebrated by all named Nikola / Nikolina. Fish is permitted.',link:'news.html#nikulden-2026'},
     {title:'Christmas Eve & Nativity of Christ — December 24–25',date:'December 24–25, 2026',img:'assets/images/hero/church_photo.jpg',text:'Christmas Eve (Badni Vecher) services on December 24 at 6:00 PM. Christmas Liturgy on December 25 at 10:30 AM. Christos se Rodi! — Voistinu se Rodi!',link:'news.html#christmas-2026'},
     {title:'Year-End & St. Stephen\'s Day — December 27',date:'December 27, 2026',img:'assets/images/hero/church_photo.jpg',text:'The Sunday after Christmas honours St. Stephen the First-Martyr (Stefanovden). All named Stefan / Stefania are celebrated. The Twelve Days of Christmas continue in joy.',link:'news.html#stefanovden-2026'}],
  ];

  // ============================================================
  // FLOATING ACTION BUTTONS
  // ============================================================
  function initFABs() {
    var fabs = document.querySelectorAll('.fab-btn');
    if (!fabs.length) return;

    var shown = false;

    function toggleFABs() {
      var scrolled = window.pageYOffset > 400;
      if (scrolled === shown) return;
      shown = scrolled;
      fabs.forEach(function (fab, i) {
        if (scrolled) {
          setTimeout(function () { fab.classList.add('visible'); }, i * 60);
        } else {
          fab.classList.remove('visible');
        }
      });
    }

    window.addEventListener('scroll', toggleFABs, { passive: true });
    toggleFABs();
  }

  // ============================================================
  // NEWSLETTER MODAL
  // ============================================================
  function initNewsletterModal() {
    var modal        = document.getElementById('newsletter-modal');
    var fabBtn       = document.getElementById('fab-newsletter-open');
    var closeBtn     = document.getElementById('newsletter-modal-close');
    var modalForm    = document.getElementById('newsletter-modal-form');
    var thanks       = document.getElementById('newsletter-modal-thanks');
    var formWrap     = document.getElementById('newsletter-modal-form-wrap');
    var triggers     = document.querySelectorAll('.open-newsletter-trigger');
    var inlineForm   = document.getElementById('newsletter-inline-form');
    var inlineSuccess = document.getElementById('newsletter-inline-success');

    if (!modal) return;

    function openModal() {
      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      // Reset state
      if (formWrap) formWrap.style.display = '';
      if (thanks) thanks.style.display = 'none';
      if (modalForm) modalForm.reset();
      // Focus close button
      setTimeout(function () {
        if (closeBtn) closeBtn.focus();
      }, 300);
    }

    function closeModal() {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    if (fabBtn) fabBtn.addEventListener('click', openModal);
    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    // All "E-Newsletter" links open the modal
    triggers.forEach(function (t) {
      t.addEventListener('click', function (e) {
        e.preventDefault();
        openModal();
      });
    });

    // Close on overlay click
    modal.addEventListener('click', function (e) {
      if (e.target === modal) closeModal();
    });

    // ESC key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
    });

    // Modal form submission
    if (modalForm) {
      modalForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var email = modalForm.querySelector('input[type="email"]').value;
        if (!email) return;
        // Simulate subscription (in production: send to server/Mailchimp)
        if (formWrap) formWrap.style.display = 'none';
        if (thanks) thanks.style.display = 'block';
        setTimeout(closeModal, 3500);
      });
    }

    // Inline newsletter form
    if (inlineForm) {
      inlineForm.addEventListener('submit', function (e) {
        e.preventDefault();
        var email = inlineForm.querySelector('input[type="email"]').value;
        if (!email) return;
        inlineForm.style.display = 'none';
        if (inlineSuccess) inlineSuccess.style.display = 'block';
      });
    }
  }

  // ============================================================
  // MINI CALENDAR
  // ============================================================
  function initMiniCalendar() {
    var grid      = document.getElementById('cal-dates-grid');
    var monthLbl  = document.getElementById('cal-month-label');
    var yearLbl   = document.getElementById('cal-year-label');
    var prevBtn   = document.getElementById('cal-prev');
    var nextBtn   = document.getElementById('cal-next');

    if (!grid) return;

    var monthNames = [
      'January','February','March','April','May','June',
      'July','August','September','October','November','December'
    ];

    // Auto-start at today's month, locked to 2026
    var today    = new Date();
    var curYear  = 2026;
    var curMonth = today.getFullYear() === 2026 ? today.getMonth() : 0;

    function padZero(n) { return n < 10 ? '0' + n : '' + n; }

    // ---- Render the dynamic events list panel ----
    function renderEventsList(year, month) {
      var list = document.getElementById('upcoming-events-list');
      if (!list) return;

      var showAll = list.getAttribute('data-show-all') === 'true';
      var eventsForMonth = (year === 2026 && detailedEvents[month]) ? detailedEvents[month] : null;

      if (showAll) {
        // Show all 2026 events
        var allHTML = '';
        for (var m = 0; m < 12; m++) {
          if (!detailedEvents[m]) continue;
          allHTML += '<div class="events-month-heading">' + monthNames[m] + ' 2026</div>';
          detailedEvents[m].forEach(function (ev) {
            allHTML += buildEventItemHTML(ev, m);
          });
        }
        list.innerHTML = allHTML || '<p style="color:#888;padding:20px 0">No events data available.</p>';
        return;
      }

      if (!eventsForMonth || !eventsForMonth.length) {
        list.innerHTML = '<p style="padding:20px 0;color:#888;font-family:\'PT Serif\',serif">No scheduled events for ' + monthNames[month] + ' ' + year + '. Check back closer to the date.</p>';
        return;
      }

      var html = '';
      eventsForMonth.forEach(function (ev) {
        html += buildEventItemHTML(ev, month);
      });
      list.innerHTML = html;
    }

    function buildEventItemHTML(ev, month) {
      var badgeClass = ev.type === 'feast' ? 'event-date-badge badge-red' : (ev.type === 'community' ? 'event-date-badge badge-gold' : 'event-date-badge');
      var itemClass  = ev.type === 'feast' ? 'event-item feast-day' : (ev.type === 'community' ? 'event-item community-event' : 'event-item');
      return '<div class="' + itemClass + '">' +
        '<div class="' + badgeClass + '">' +
        '<span class="event-date-day">' + ev.day + '</span>' +
        '<span class="event-date-month">' + monthNames[month].slice(0, 3).toUpperCase() + '</span>' +
        '</div>' +
        '<div class="event-info">' +
        '<div class="event-title">' + ev.title + '</div>' +
        (ev.time ? '<div class="event-time">' + ev.time + '</div>' : '') +
        (ev.desc ? '<div class="event-desc">' + ev.desc + '</div>' : '') +
        '</div></div>';
    }

    // ---- Toggle: show all year ----
    var toggleBtn = document.getElementById('cal-toggle-all');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', function () {
        var list = document.getElementById('upcoming-events-list');
        if (!list) return;
        var isAll = list.getAttribute('data-show-all') === 'true';
        list.setAttribute('data-show-all', isAll ? 'false' : 'true');
        toggleBtn.textContent = isAll ? 'View Full Year ▾' : 'View Current Month ▴';
        renderEventsList(curYear, curMonth);
      });
    }

    function renderCalendar() {
      var year  = curYear;
      var month = curMonth;

      if (monthLbl) monthLbl.textContent = monthNames[month] + ' ' + year;
      if (yearLbl)  yearLbl.textContent  = year;

      var firstDay  = new Date(year, month, 1).getDay(); // 0=Sun
      var daysCount = new Date(year, month + 1, 0).getDate();

      var html = '';
      for (var i = 0; i < firstDay; i++) {
        html += '<div class="mini-cal-date empty"></div>';
      }

      var todayStr = today.getFullYear() + '-' + padZero(today.getMonth() + 1) + '-' + padZero(today.getDate());

      for (var d = 1; d <= daysCount; d++) {
        var dateStr = year + '-' + padZero(month + 1) + '-' + padZero(d);
        var dayOfWeek = (firstDay + d - 1) % 7;
        var events = eventMap[dateStr] || [];
        var hasFeast   = events.some(function (ev) { return ev.type === 'feast'; });
        var hasService = events.some(function (ev) { return ev.type === 'service' || ev.type === 'community'; });
        var isSunday   = dayOfWeek === 0;
        var isToday    = dateStr === todayStr;

        var classes = 'mini-cal-date';
        if (isSunday)  classes += ' sunday';
        if (isToday)   classes += ' today';
        if (hasFeast)  classes += ' has-feast';
        else if (hasService) classes += ' has-event';

        var title = events.length ? events.map(function (ev) { return ev.title; }).join(' | ') : '';

        html += '<div class="' + classes + '"' +
          (title ? ' title="' + title.replace(/"/g, '&quot;') + '"' : '') +
          ' tabindex="0" data-date="' + dateStr + '">' + d + '</div>';
      }

      grid.innerHTML = html;

      grid.querySelectorAll('.mini-cal-date:not(.empty)').forEach(function (el) {
        el.style.cursor = 'pointer';
        el.addEventListener('click', function () {
          var dateStr = el.getAttribute('data-date');
          if (!dateStr) return;
          // Jump slider to this date
          if (typeof window.jumpToEventDate === 'function') {
            window.jumpToEventDate(dateStr);
            // Highlight selected date
            grid.querySelectorAll('.mini-cal-date').forEach(function (c) { c.classList.remove('selected'); });
            el.classList.add('selected');
          }
          // Scroll slider into view
          var list = document.getElementById('upcoming-events-list') || document.getElementById('events-calendar');
          if (list) list.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        });
        el.addEventListener('keydown', function (e) {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); el.click(); }
        });
      });

      // Update events list when month changes (skip if showing all, or slider mode)
      var list = document.getElementById('upcoming-events-list');
      if (list && list.getAttribute('data-show-all') !== 'true' && list.getAttribute('data-mode') !== 'slider') {
        renderEventsList(year, month);
      }
    }

    function updateNavBtns() {
      if (prevBtn) prevBtn.disabled = curMonth === 0;
      if (nextBtn) nextBtn.disabled = curMonth === 11;
    }

    if (prevBtn) prevBtn.addEventListener('click', function () {
      if (curMonth > 0) { curMonth--; renderCalendar(); updateNavBtns(); }
    });
    if (nextBtn) nextBtn.addEventListener('click', function () {
      if (curMonth < 11) { curMonth++; renderCalendar(); updateNavBtns(); }
    });

    renderCalendar();
    updateNavBtns();
  }

  // ============================================================
  // MOBILE DROPDOWN NAVIGATION
  // ============================================================
  function initMobileDropdowns() {
    var toggleBtns = document.querySelectorAll('.nav-toggle-btn');
    toggleBtns.forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        var targetId = btn.getAttribute('data-target');
        var dropdown = document.getElementById(targetId);
        if (!dropdown) return;

        var isOpen = dropdown.classList.contains('open');

        // Close all other mobile dropdowns
        document.querySelectorAll('.nav-dropdown-mobile.open').forEach(function (d) {
          d.classList.remove('open');
        });
        document.querySelectorAll('.nav-toggle-btn.rotated').forEach(function (b) {
          b.classList.remove('rotated');
        });

        if (!isOpen) {
          dropdown.classList.add('open');
          btn.classList.add('rotated');
        }
      });
    });
  }

  // ============================================================
  // HERO DOTS INDICATOR
  // ============================================================
  function initHeroDots() {
    var slides   = document.querySelectorAll('.hero-slide');
    var dotsWrap = document.getElementById('hero-dots');
    if (!slides.length || !dotsWrap) return;

    // Create dots
    slides.forEach(function (_, i) {
      var dot = document.createElement('button');
      dot.className = 'hero-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
      dot.setAttribute('data-index', i);
      dotsWrap.appendChild(dot);
    });

    // Observe slide changes via MutationObserver
    var observer = new MutationObserver(function () {
      slides.forEach(function (slide, i) {
        var dot = dotsWrap.children[i];
        if (dot) {
          dot.classList.toggle('active', slide.classList.contains('active'));
        }
      });
    });
    slides.forEach(function (slide) {
      observer.observe(slide, { attributes: true, attributeFilter: ['class'] });
    });

    // Click dot to jump to slide (needs main.js to expose a method — fallback: re-trigger)
    dotsWrap.addEventListener('click', function (e) {
      var btn = e.target.closest('.hero-dot');
      if (!btn) return;
      var idx = parseInt(btn.getAttribute('data-index'), 10);
      slides.forEach(function (s, i) {
        s.classList.toggle('active', i === idx);
      });
      dotsWrap.querySelectorAll('.hero-dot').forEach(function (d, i) {
        d.classList.toggle('active', i === idx);
      });
    });
  }

  // ============================================================
  // ANIMATE ON SCROLL (simple fade-in)
  // ============================================================
  function initScrollAnimations() {
    if (!window.IntersectionObserver) return;
    var els = document.querySelectorAll('.action-card, .event-item, .card, .service-card, .donation-way-item');
    if (!els.length) return;

    els.forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
    });

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    els.forEach(function (el) { io.observe(el); });
  }

  // ============================================================
  // DYNAMIC NEWS SECTION (index.html)
  // ============================================================
  function initDynamicNews() {
    var grid = document.getElementById('news-cards-grid');
    if (!grid) return;

    var month = new Date().getMonth();
    var articles = monthlyNews[month] || monthlyNews[3];

    var html = articles.map(function (a) {
      return '<article class="card">' +
        '<img src="' + a.img + '" alt="' + a.title + '" class="card-image" style="height:220px;object-fit:cover;width:100%" onerror="this.style.display=\'none\'">' +
        '<div class="card-body">' +
        '<h3 class="card-title">' + a.title + '</h3>' +
        '<p class="card-date">' + a.date + '</p>' +
        '<p class="card-text">' + a.text + '</p>' +
        '<a href="' + a.link + '" class="btn btn-secondary" style="margin-top:18px">Read More</a>' +
        '</div></article>';
    }).join('');

    grid.innerHTML = html;
  }

  // ============================================================
  // UPCOMING EVENTS SLIDER (Home Page — Parts 1, 2 & 6)
  // ============================================================
  function initUpcomingEventsSlider() {
    var sliderList = document.getElementById('upcoming-events-list');
    var prevBtn    = document.getElementById('event-prev');
    var nextBtn    = document.getElementById('event-next');

    // Only activate on home-page slider (data-mode="slider")
    if (!sliderList || sliderList.getAttribute('data-mode') !== 'slider') return;

    var monthNames = [
      'January','February','March','April','May','June',
      'July','August','September','October','November','December'
    ];
    var dayNames = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

    // Parse "YYYY-MM-DD" safely in LOCAL timezone (avoids UTC midnight shift)
    function parseLocalDate(str) {
      var p = str.split('-');
      var d = new Date(+p[0], +p[1] - 1, +p[2]);
      d.setHours(0, 0, 0, 0);
      return d;
    }

    // Today normalized to midnight
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    var todayTime = today.getTime();

    // All events sorted chronologically
    var allEvents = churchEvents.slice().sort(function (a, b) {
      return parseLocalDate(a.date).getTime() - parseLocalDate(b.date).getTime();
    });

    // Start at today's event or next upcoming
    var startIdx = 0;
    for (var i = 0; i < allEvents.length; i++) {
      if (parseLocalDate(allEvents[i].date).getTime() >= todayTime) { startIdx = i; break; }
    }
    var currentIdx = startIdx;

    // ---- Render one event ----
    function renderEvent(idx) {
      var total = allEvents.length;
      if (!total) {
        sliderList.style.opacity = '1';
        sliderList.innerHTML = '<p style="padding:20px 0;color:#888;font-family:\'PT Serif\',serif">No events found.</p>';
        return;
      }

      // Infinite loop
      if (idx < 0)      idx = total - 1;
      if (idx >= total) idx = 0;
      currentIdx = idx;

      var ev      = allEvents[currentIdx];
      var evDate  = parseLocalDate(ev.date);
      var isPast  = evDate.getTime() < todayTime;
      var isToday = evDate.getTime() === todayTime;

      // Human-readable full date
      var readableDate = dayNames[evDate.getDay()] + ', ' +
        monthNames[evDate.getMonth()] + ' ' + evDate.getDate() + ', ' + evDate.getFullYear();

      // Badge & item classes
      var badgeClass = ev.type === 'feast'
        ? 'badge-red'
        : (ev.type === 'community' ? 'badge-gold' : '');
      var itemClass = 'event-item' +
        (ev.type === 'feast'     ? ' feast-day'       : '') +
        (ev.type === 'community' ? ' community-event'  : '') +
        (isToday                 ? ' event-today'      : '') +
        (isPast                  ? ' event-past'       : '');

      // Render with fade
      sliderList.style.opacity = '0';
      setTimeout(function () {
        sliderList.innerHTML =
          '<div class="' + itemClass + '">' +
            '<div class="event-date-badge ' + badgeClass + '">' +
              '<span class="event-date-day">' + evDate.getDate() + '</span>' +
              '<span class="event-date-month">' + monthNames[evDate.getMonth()].slice(0, 3).toUpperCase() + '</span>' +
            '</div>' +
            '<div class="event-info">' +
              '<div class="event-date-full">' + readableDate + '</div>' +
              '<div class="event-title">' + ev.title + '</div>' +
            '</div>' +
          '</div>';
        sliderList.style.opacity = '1';
      }, 160);
    }

    if (prevBtn) prevBtn.addEventListener('click', function () { renderEvent(currentIdx - 1); });
    if (nextBtn) nextBtn.addEventListener('click', function () { renderEvent(currentIdx + 1); });

    // Keyboard support
    document.addEventListener('keydown', function (e) {
      if (!document.getElementById('event-slider-area')) return;
      if (e.key === 'ArrowLeft')  renderEvent(currentIdx - 1);
      if (e.key === 'ArrowRight') renderEvent(currentIdx + 1);
    });

    // ---- Calendar date click → jump slider ----
    // Exposed globally so renderCalendar() can call it
    window.jumpToEventDate = function (dateStr) {
      // Find exact match first
      for (var j = 0; j < allEvents.length; j++) {
        if (allEvents[j].date === dateStr) { renderEvent(j); return; }
      }
      // No exact match — find nearest upcoming event from that date
      var clickedTime = parseLocalDate(dateStr).getTime();
      var nearest = -1;
      for (var k = 0; k < allEvents.length; k++) {
        if (parseLocalDate(allEvents[k].date).getTime() >= clickedTime) { nearest = k; break; }
      }
      if (nearest === -1) nearest = allEvents.length - 1; // past the last event
      renderEvent(nearest);
    };

    renderEvent(startIdx);
  }

  // ============================================================
  // INIT
  // ============================================================
  document.addEventListener('DOMContentLoaded', function () {
    initFABs();
    initNewsletterModal();
    initMiniCalendar();
    initUpcomingEventsSlider();
    initMobileDropdowns();
    initHeroDots();
    initScrollAnimations();
    initDynamicNews();
  });

}());
