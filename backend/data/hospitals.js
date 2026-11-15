export const hospitals = [
  {
    id: 1,
    name: "AIIMS New Delhi",
    city: "New Delhi",
    state: "Delhi",
    ownership: "Government",
    address: "Sri Aurobindo Marg, Ansari Nagar, New Delhi",
    phone: "011-2658 8500",
    beds: { general: { total: 320, occupied: 267 }, icu: { total: 64, occupied: 51 }, oxygen: { total: 90, occupied: 66 } },
    updatedAt: new Date().toISOString(),
    demo: true
  },
  {
    id: 2,
    name: "Sir Ganga Ram Hospital",
    city: "Delhi",
    state: "Delhi",
    ownership: "Private",
    address: "Rajinder Nagar, New Delhi",
    phone: "011-4225 4000",
    beds: { general: { total: 210, occupied: 171 }, icu: { total: 46, occupied: 37 }, oxygen: { total: 58, occupied: 43 } },
    updatedAt: new Date().toISOString(),
    demo: true
  },
  {
    id: 3,
    name: "Kokilaben Dhirubhai Ambani Hospital",
    city: "Mumbai",
    state: "Maharashtra",
    ownership: "Private",
    address: "Rao Saheb Achutrao Patwardhan Marg, Andheri West, Mumbai",
    phone: "022-4269 6969",
    beds: { general: { total: 240, occupied: 194 }, icu: { total: 56, occupied: 44 }, oxygen: { total: 72, occupied: 54 } },
    updatedAt: new Date().toISOString(),
    demo: true
  },
  {
    id: 4,
    name: "Sanjay Gandhi Postgraduate Institute",
    city: "Lucknow",
    state: "Uttar Pradesh",
    ownership: "Government",
    address: "Raebareli Road, Lucknow, Uttar Pradesh",
    phone: "0522-249 4000",
    beds: { general: { total: 250, occupied: 211 }, icu: { total: 50, occupied: 41 }, oxygen: { total: 70, occupied: 53 } },
    updatedAt: new Date().toISOString(),
    demo: true
  },
  { id: 5, name: "Tata Memorial Hospital", city: "Mumbai", state: "Maharashtra", ownership: "Government", address: "Dr E Borges Road, Parel, Mumbai", phone: "022-2417 7000", beds: { general: { total: 280, occupied: 238 }, icu: { total: 52, occupied: 43 }, oxygen: { total: 80, occupied: 62 } }, updatedAt: new Date().toISOString(), demo: true },
  { id: 6, name: "Christian Medical College", city: "Vellore", state: "Tamil Nadu", ownership: "Private", address: "Ida Scudder Road, Vellore, Tamil Nadu", phone: "0416-228 1000", beds: { general: { total: 300, occupied: 249 }, icu: { total: 60, occupied: 48 }, oxygen: { total: 86, occupied: 65 } }, updatedAt: new Date().toISOString(), demo: true },
  { id: 7, name: "Apollo Hospitals", city: "Chennai", state: "Tamil Nadu", ownership: "Private", address: "Greams Lane, Off Greams Road, Chennai", phone: "044-2829 3333", beds: { general: { total: 230, occupied: 177 }, icu: { total: 48, occupied: 35 }, oxygen: { total: 68, occupied: 49 } }, updatedAt: new Date().toISOString(), demo: true },
  { id: 8, name: "Narayana Health City", city: "Bengaluru", state: "Karnataka", ownership: "Private", address: "Hosur Road, Bommasandra, Bengaluru", phone: "080-7122 2222", beds: { general: { total: 260, occupied: 215 }, icu: { total: 58, occupied: 47 }, oxygen: { total: 76, occupied: 58 } }, updatedAt: new Date().toISOString(), demo: true },
  { id: 9, name: "Nizam's Institute of Medical Sciences", city: "Hyderabad", state: "Telangana", ownership: "Government", address: "Punjagutta, Hyderabad, Telangana", phone: "040-2348 9000", beds: { general: { total: 220, occupied: 185 }, icu: { total: 44, occupied: 36 }, oxygen: { total: 64, occupied: 48 } }, updatedAt: new Date().toISOString(), demo: true },
  { id: 10, name: "Sawai Man Singh Hospital", city: "Jaipur", state: "Rajasthan", ownership: "Government", address: "JLN Marg, Jaipur, Rajasthan", phone: "0141-251 8383", beds: { general: { total: 310, occupied: 269 }, icu: { total: 55, occupied: 46 }, oxygen: { total: 82, occupied: 63 } }, updatedAt: new Date().toISOString(), demo: true },
  { id: 11, name: "Institute of Post Graduate Medical Education & Research", city: "Kolkata", state: "West Bengal", ownership: "Government", address: "A.J.C. Bose Road, Kolkata, West Bengal", phone: "033-2204 1100", beds: { general: { total: 270, occupied: 226 }, icu: { total: 54, occupied: 45 }, oxygen: { total: 78, occupied: 59 } }, updatedAt: new Date().toISOString(), demo: true },
  { id: 12, name: "AIIMS Bhubaneswar", city: "Bhubaneswar", state: "Odisha", ownership: "Government", address: "Sijua, Patrapada, Bhubaneswar, Odisha", phone: "0674-247 6789", beds: { general: { total: 200, occupied: 163 }, icu: { total: 40, occupied: 31 }, oxygen: { total: 60, occupied: 42 } }, updatedAt: new Date().toISOString(), demo: true }
];
