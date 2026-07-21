const fs = require('fs');
const path = require('path');

const PRODUCTS_DIR = path.resolve(__dirname, '..', 'src', 'data', 'products');

const brands = {
  'Valves': ['Cameron', 'Honeywell', 'Emerson', 'Flowserve', 'Crane', 'Velan', 'Spirax Sarco', 'Bray', 'Kitz', 'Neles', 'Metso', 'Samson'],
  'Bearings': ['SKF', 'NSK', 'FAG', 'Timken', 'NTN', 'KOYO', 'INA', 'NACHI', 'RBC', 'SNR', 'ZWZ', 'HRB'],
  'Automation': ['Siemens', 'Allen-Bradley', 'Mitsubishi', 'Omron', 'Schneider', 'B&R', 'Beckhoff', 'ABB', 'GE Fanuc', 'Bosch Rexroth', 'Panasonic', 'Emerson'],
  'Controllers': ['Honeywell', 'Yokogawa', 'ABB', 'Siemens', 'Emerson', 'Omega', 'Eurotherm', 'Watlow', 'Red Lion', 'West Control', 'RKC', 'Fuji Electric'],
  'Sensors': ['Siemens', 'ABB', 'Endress+Hauser', 'Vega', 'Rosemount', 'Krohne', 'Yokogawa', 'Pepperl+Fuchs', 'Balluff', 'Turck', 'SICK', 'Omron'],
  'Hydraulics': ['Bosch Rexroth', 'Parker', 'Eaton', 'Danfoss', 'Sauer-Danfoss', 'Hydac', 'Atos', 'Vickers', 'M+S', 'Bucher', 'Hydrocontrol', 'Walvoil'],
  'Pneumatics': ['Festo', 'SMC', 'Parker', 'Norgren', 'Bosch Rexroth', 'Camozzi', 'AVENTICS', 'CKD', 'Metal Work', 'AirTac', 'Humphrey', 'Clippard'],
  'Turbine Parts': ['GE', 'Siemens', 'Mitsubishi', 'Alstom', 'Ansaldo', 'Solar Turbines', 'Kawasaki', 'MAN Energy', 'Woodward', 'Chromalloy', 'Precision Castparts', 'Mee Industries'],
  'Electrical': ['ABB', 'Siemens', 'Schneider', 'Eaton', 'Legrand', 'GE', 'Hager', 'Rittal', 'Weidmuller', 'Wago', 'Phoenix Contact', 'ABB'],
  'Filters': ['Pall', 'Hydac', 'Parker', 'Donaldson', 'Eaton', 'SMC', 'Festo', 'Camfil', 'Mann+Hummel', 'Sperian', 'AAF International', 'Donaldson'],
  'Seals': ['Parker', 'Freudenberg', 'Trelleborg', 'SKF', 'Garlock', 'Burgmann', 'Gore', 'A.W. Chesterton', 'Bal-Seal', 'American Seal', 'James Walker', 'Klinger'],
  'Gears': ['SEW', 'NORD', 'Sumitomo', 'Bonfiglioli', 'Flender', 'Falk', 'Boston Gear', 'Bauer', 'Rossi', 'Varvel', 'Motovario', 'Wittenstein'],
  'Couplings': ['Siemens/Flender', 'Lovejoy', 'Rexnord', 'Falk', 'Kop-Flex', 'Ringfeder', 'Mayr', 'KTR', 'Bibby', 'Voith', 'Jaure', 'Centaflex'],
  'Fasteners': ['Fastenal', 'McMaster-Carr', 'Unbrako', 'SPS', 'Hilti', 'ITW', 'Simpson', 'Anvil', 'LISI', 'Parker Fasteners', 'Cleveland', 'Dyson'],
  'Manifolds': ['Parker', 'Hydac', 'Bosch Rexroth', 'Eaton', 'Yates', 'Daman', 'Festo', 'SMC', 'Vickers', 'Hydraforce', 'Sun Hydraulics', 'Deltrol'],
  'PLC Accessories': ['Siemens', 'Allen-Bradley', 'Schneider', 'Omron', 'Mitsubishi', 'ABB', 'Phoenix Contact', 'Wago', 'Beckhoff', 'Weidmuller', 'Pepperl+Fuchs', 'Adalet']
};

const manufacturers = {
  'Valves': ['Cameron International', 'Honeywell Process Solutions', 'Emerson Automation Solutions', 'Flowserve Corporation', 'Crane Co.', 'Velan Inc.', 'Spirax Sarco Ltd', 'Bray International', 'Kitz Corporation', 'Neles (Valmet)', 'Metso Outotec', 'Samson AG'],
  'Bearings': ['SKF Group', 'NSK Ltd.', 'FAG (Schaeffler)', 'Timken Company', 'NTN Corporation', 'KOYO (JTEKT)', 'INA (Schaeffler)', 'NACHI-Fujikoshi', 'RBC Bearings', 'SNR (NTN-SNR)', 'ZWZ Bearings', 'HRB Harbin'],
  'Automation': ['Siemens AG', 'Rockwell Automation', 'Mitsubishi Electric', 'Omron Corporation', 'Schneider Electric', 'B&R Automation', 'Beckhoff Automation', 'ABB Ltd.', 'GE Intelligent Platforms', 'Bosch Rexroth AG', 'Panasonic Industrial', 'Emerson Electric'],
  'Controllers': ['Honeywell Process Solutions', 'Yokogawa Electric', 'ABB Ltd.', 'Siemens AG', 'Emerson Electric', 'Omega Engineering', 'Eurotherm by Watlow', 'Watlow Electric', 'Red Lion Controls', 'West Control Solutions', 'RKC Instruments', 'Fuji Electric'],
  'Sensors': ['Siemens AG', 'ABB Ltd.', 'Endress+Hauser', 'Vega Grieshaber KG', 'Rosemount (Emerson)', 'Krohne Messtechnik', 'Yokogawa Electric', 'Pepperl+Fuchs', 'Balluff GmbH', 'Turck Inc.', 'SICK AG', 'Omron Corporation'],
  'Hydraulics': ['Bosch Rexroth AG', 'Parker Hannifin Corporation', 'Eaton Corporation', 'Danfoss A/S', 'Sauer-Danfoss Inc.', 'Hydac International', 'Atos SpA', 'Vickers (Eaton)', 'M+S Hydraulic', 'Bucher Hydraulics', 'Hydrocontrol', 'Walvoil SpA'],
  'Pneumatics': ['Festo AG & Co. KG', 'SMC Corporation', 'Parker Hannifin Corporation', 'Norgren Inc.', 'Bosch Rexroth AG', 'Camozzi Automation', 'AVENTICS GmbH', 'CKD Corporation', 'Metal Work SpA', 'AirTac International', 'Humphrey Products', 'Clippard Instrument Laboratory'],
  'Turbine Parts': ['General Electric Company', 'Siemens Energy', 'Mitsubishi Heavy Industries', 'Alstom Power', 'Ansaldo Energia', 'Solar Turbines Inc.', 'Kawasaki Heavy Industries', 'MAN Energy Solutions', 'Woodward Inc.', 'Chromalloy Gas Turbine', 'Precision Castparts Corp.', 'Mee Industries Inc.'],
  'Electrical': ['ABB Ltd.', 'Siemens AG', 'Schneider Electric', 'Eaton Corporation', 'Legrand SA', 'GE Grid Solutions', 'Hager Group', 'Rittal GmbH', 'Weidmuller Interface', 'Wago Kontakttechnik', 'Phoenix Contact', 'ABB Installation Products'],
  'Filters': ['Pall Corporation', 'Hydac International', 'Parker Hannifin', 'Donaldson Company', 'Eaton Filtration', 'SMC Corporation', 'Festo AG', 'Camfil Group', 'Mann+Hummel', 'Sperian (Honeywell)', 'AAF International', 'Donaldson Filtration'],
  'Seals': ['Parker Hannifin', 'Freudenberg Sealing', 'Trelleborg Sealing', 'SKF Group', 'Garlock (EnPro)', 'Burgmann (EagleBurgmann)', 'W.L. Gore & Associates', 'A.W. Chesterton', 'Bal Seal Engineering', 'American Seal & Packing', 'James Walker & Co.', 'Klinger Kempchen'],
  'Gears': ['SEW-Eurodrive GmbH', 'NORD Drivesystems', 'Sumitomo Drive Technologies', 'Bonfiglioli Spa', 'Siemens Flender', 'Rexnord Falk', 'Boston Gear (Altra)', 'Bauer Gear Motor', 'Rossi (Habasit)', 'Varvel SpA', 'Motovario SpA', 'Wittenstein SE'],
  'Couplings': ['Siemens AG (Flender)', 'Lovejoy Inc.', 'Rexnord Industries', 'Falk (Rexnord)', 'Kop-Flex (Emerson)', 'Ringfeder Power Transmission', 'Mayr GmbH', 'KTR Corporation', 'Bibby Turboflex', 'Voith Turbo', 'Jaure (Siemens)', 'Centaflex (Centax)'],
  'Fasteners': ['Fastenal Company', 'McMaster-Carr Supply', 'Unbrako (SPS)', 'SPS Technologies', 'Hilti Corporation', 'ITW Industrial', 'Simpson Manufacturing', 'Anvil International', 'LISI Aerospace', 'Parker Fasteners', 'Cleveland Fasteners', 'Dyson Fastener'],
  'Manifolds': ['Parker Hannifin Corporation', 'Hydac International', 'Bosch Rexroth AG', 'Eaton Corporation', 'Yates Industries', 'Daman Products', 'Festo AG', 'SMC Corporation', 'Vickers (Eaton)', 'Hydraforce Inc.', 'Sun Hydraulics', 'Deltrol Fluid Products'],
  'PLC Accessories': ['Siemens AG', 'Rockwell Automation', 'Schneider Electric', 'Omron Corporation', 'Mitsubishi Electric', 'ABB Ltd.', 'Phoenix Contact', 'Wago Kontakttechnik', 'Beckhoff Automation', 'Weidmuller Interface', 'Pepperl+Fuchs', 'Adalet (Scott Fetzer)']
};

const countryOfOrigin = ['USA', 'Germany', 'Japan', 'Switzerland', 'Sweden', 'Italy', 'France', 'UK', 'Denmark', 'Finland', 'Austria', 'China'];

const availabilities = ['in-stock', 'in-stock', 'in-stock', 'in-stock', 'low-stock', 'made-to-order'];

const certifications = {
  'Valves': ['API 600', 'API 6D', 'API 607', 'API 608', 'ASME B16.34', 'ISO 9001', 'ISO 17292', 'ISO 5208', 'CE', 'ATEX', 'SIL 3'],
  'Bearings': ['ISO 9001', 'ISO 14001', 'ISO 492', 'RoHS', 'ABEC 1', 'ABEC 3', 'ABEC 5', 'JIS B 1515', 'DIN 620'],
  'Automation': ['CE', 'UL', 'CSA', 'ATEX', 'IEC 61131-2', 'IEC 61000-6-2', 'IEC 61508', 'SIL 2', 'SIL 3', 'UL 508', 'EN 50178'],
  'Controllers': ['CE', 'UL', 'CSA', 'IEC 61010-1', 'ATEX', 'FM', 'IEC 61508', 'SIL 2', 'RoHS', 'WEEE'],
  'Sensors': ['ATEX', 'IECEx', 'FM', 'CE', 'SIL 2', 'NEPSI', 'INMETRO', 'IEC 61508', 'ISO 9001'],
  'Hydraulics': ['ISO 9001', 'CE', 'ATEX', 'SAE J745', 'ISO 4409', 'DIN ISO 1219', 'ISO 4413', 'VDMA 24572'],
  'Pneumatics': ['ISO 6432', 'ISO 15552', 'CE', 'UKCA', 'ATEX', 'IEC 61131-2', 'ISO 9001', 'VDMA 24345'],
  'Turbine Parts': ['ASME B31.1', 'ISO 9001', 'AS9100', 'ISO 14001', 'API 616', 'NACE MR0175', 'GE S-421', 'ASTM F467'],
  'Electrical': ['IEC 60947-2', 'CE', 'UL 489', 'UL 508', 'CCC', 'IEC 60947-4-1', 'NEMA AB', 'CSA C22.2', 'RoHS', 'REACH'],
  'Filters': ['ISO 9001', 'ISO 16889', 'ASME B31.1', 'ATEX', 'ISO 2942', 'ISO 2943', 'ISO 3968', 'CE', 'UL'],
  'Seals': ['ISO 9001', 'ISO 3601', 'FDA 21 CFR 177', 'NSF 61', 'WRAS', 'ACS', 'DVGW', 'KTW', 'W270', 'CE', 'ATEX'],
  'Gears': ['CE', 'UL', 'CSA', 'IEC 60034', 'ATEX', 'ISO 9001', 'AGMA 2001', 'ISO 6336', 'DIN 3990', 'GB/T 3811'],
  'Couplings': ['ISO 9001', 'ATEX', 'CE', 'API 610', 'ISO 14691', 'AGMA 9001', 'DIN 740', 'ISO 8574'],
  'Fasteners': ['SAE J429', 'ISO 898-1', 'ASTM F568M', 'ASTM A325', 'ASTM A490', 'DIN 931', 'DIN 933', 'ISO 4014', 'IFL', 'IFI'],
  'Manifolds': ['ISO 9001', 'ASTM B209', 'MIL-A-8625', 'CE', 'SAE J518', 'ISO 4401', 'CETOP RP121', 'DIN 24340', 'ISO 15217'],
  'PLC Accessories': ['CE', 'UL', 'IEC 61131-2', 'ATEX', 'CSA', 'IEC 61000-6-4', 'EN 61131', 'RoHS', 'WEEE', 'DNV', 'GL']
};

const categoriesData = {
  'Valves': {
    prefix: 'vlv',
    subcategories: ['Gate Valves', 'Ball Valves', 'Check Valves', 'Butterfly Valves', 'Globe Valves', 'Pressure Relief Valves', 'Solenoid Valves', 'Diaphragm Valves', 'Pinch Valves', 'Plug Valves', 'Control Valves', 'Needle Valves'],
    series: ['DuraGate', 'V-Ball', 'SureCheck', 'FlexDisc', 'T-Line', 'ReliefPro', 'Solenact', 'DiaFlex', 'PinchMaster', 'PrecisionPlug', 'FlowControl', 'MicroNeedle'],
    materials: ['A216 WCB Carbon Steel', 'CF8M Stainless Steel', 'A351 CF3M', 'Duplex SS 2205', 'Super Duplex 2507', 'Hastelloy C-276', 'Inconel 625', 'Monel 400', 'Titanium Grade 2', 'PVC', 'CPVC', 'PVDF'],
    applications: {
      'Gate Valves': ['Oil & Gas Pipelines', 'Refinery Process Lines', 'Chemical Processing Plants', 'Power Generation Steam Systems', 'Water Distribution Networks', 'Mining Slurry Systems'],
      'Ball Valves': ['Chemical Processing', 'Pharmaceutical Manufacturing', 'Refining', 'Water Treatment', 'Gas Distribution', 'Cryogenic Applications'],
      'Check Valves': ['Pump Discharge Lines', 'Compressor Piping', 'Steam Lines', 'Wastewater Systems', 'Fire Protection Systems', 'Condensate Return'],
      'Butterfly Valves': ['HVAC Systems', 'Water Supply', 'Swimming Pools', 'Cooling Towers', 'Industrial Fans', 'Gas Handling'],
      'Globe Valves': ['Steam Systems', 'Boiler Feedwater', 'Chemical Injection', 'Cooling Systems', 'Fossil Fuel Lines', 'Deaerator Systems'],
      'Pressure Relief Valves': ['Steam Boilers', 'Pressure Vessels', 'Piping Systems', 'Storage Tanks', 'Heat Exchangers', 'Compressed Air Systems'],
      'Solenoid Valves': ['Automated Process Lines', 'Irrigation Systems', 'Fuel Systems', 'Steam Control', 'Water Treatment', 'Analytical Instruments'],
      'Diaphragm Valves': ['Pharmaceutical Processing', 'Food & Beverage', 'Biotech Manufacturing', 'Water Purification', 'Cosmetics', 'Semiconductor'],
      'Pinch Valves': ['Mining Slurry', 'Wastewater Treatment', 'Chemical Dosing', 'Cement Handling', 'Food Processing', 'Pulp & Paper'],
      'Plug Valves': ['Gas Distribution', 'Oil Gathering', 'Sewage Systems', 'Industrial Exhaust', 'Product Switching', 'Air Separation'],
      'Control Valves': ['Process Control', 'Power Generation', 'Refining', 'Chemical Plants', 'HVAC', 'Cryogenic'],
      'Needle Valves': ['Instrumentation', 'Hydraulic Systems', 'Gas Analyzers', 'Sampling Systems', 'Metering Stations', 'Test Stands']
    }
  },
  'Bearings': {
    prefix: 'brn',
    subcategories: ['Deep Groove Ball Bearings', 'Angular Contact Ball Bearings', 'Spherical Roller Bearings', 'Cylindrical Roller Bearings', 'Tapered Roller Bearings', 'Thrust Bearings', 'Needle Roller Bearings', 'Self-Aligning Ball Bearings', 'Mounted Bearings', 'Linear Bearings', 'Plain Bearings', 'Miniature Bearings'],
    series: ['6200 Series', '7200 Series', '22300 Series', 'NU200 Series', '32000 Series', '51000 Series', 'NA6900 Series', '1200 Series', 'UC200 Series', 'LME Series', 'GE Series', '6800 Series'],
    materials: ['Chrome Steel (52100)', 'Stainless Steel (440C)', 'Hybrid Ceramic (Si3N4)', 'Heat-Treated Steel', 'Case-Hardened Steel', 'Tool Steel (M50)', 'Nitrided Steel', 'Plastic (PEEK / PTFE)'],
    applications: {
      'Deep Groove Ball Bearings': ['Electric Motors', 'Pumps', 'Industrial Gearboxes', 'Conveyors', 'Household Appliances', 'Power Tools'],
      'Angular Contact Ball Bearings': ['Machine Tool Spindles', 'High-Speed Motors', 'Pumps', 'Gearboxes', 'Compressors', 'Robotics'],
      'Spherical Roller Bearings': ['Paper Mills', 'Material Handling', 'Mining Equipment', 'Wind Turbines', 'Marine Propulsion', 'Steel Mills'],
      'Cylindrical Roller Bearings': ['Machine Tools', 'Electric Motors', 'Rolling Mills', 'Railway Axles', 'Pumps', 'Compressors'],
      'Tapered Roller Bearings': ['Automotive Hubs', 'Railroad Axles', 'Construction Equipment', 'Agricultural Machinery', 'Gearboxes', 'Mining Trucks'],
      'Thrust Bearings': ['Hydroelectric Turbines', 'Marine Propellers', 'Crane Hooks', 'Pumps', 'Extruders', 'Machine Tool Tables'],
      'Needle Roller Bearings': ['Automotive Transmissions', 'Forklifts', 'Industrial Robots', 'Printing Machines', 'Small Engines', 'Textile Machinery'],
      'Self-Aligning Ball Bearings': ['Agricultural Equipment', 'Conveyor Systems', 'Fans', 'Blowers', 'Textile Machinery', 'Woodworking'],
      'Mounted Bearings': ['Conveyor Systems', 'Agricultural Equipment', 'Food Processing', 'Packaging Machinery', 'Material Handling', 'HVAC Fans'],
      'Linear Bearings': ['CNC Machines', '3D Printers', 'Pick-and-Place', 'Medical Equipment', 'Automation Slides', 'Packaging Equipment'],
      'Plain Bearings': ['Construction Equipment', 'Mining Machinery', 'Marine Rudders', 'Bridge Bearings', 'Hydraulic Cylinders', 'Forging Presses'],
      'Miniature Bearings': ['Dental Handpieces', 'Hard Disk Drives', 'Model Aircraft', 'Medical Devices', 'Small Motors', 'Precision Instruments']
    }
  },
  'Automation': {
    prefix: 'aut',
    subcategories: ['Programmable Logic Controllers', 'Human Machine Interfaces', 'Variable Frequency Drives', 'Servo Drives', 'CNC Controllers', 'PAC Controllers', 'Remote I/O Systems', 'Industrial PC', 'Embedded Controllers', 'Motion Controllers', 'Safety Controllers', 'PID Controllers'],
    series: ['SIMATIC S7', 'PanelView', 'FR-A800', 'SGD7S', 'Série CNC', 'CompactLogix', 'ET 200', 'IPC3000', 'Crouzet Millenium', 'AC Servo', 'GuardLogix', 'UDC Series'],
    materials: ['Plastic Housing with Metal Shielding', 'Aluminum Chassis', 'Steel Enclosure', 'Composite Material', 'Stainless Steel Panel', 'Die-Cast Aluminum', 'Industrial Plastic', 'Reinforced Polymer'],
    applications: {
      'Programmable Logic Controllers': ['Factory Automation', 'Machine Control', 'Process Control', 'Material Handling', 'Packaging Lines', 'Assembly Lines'],
      'Human Machine Interfaces': ['Machine Control Panels', 'Process Monitoring', 'SCADA Systems', 'Building Automation', 'Production Floor Displays', 'Diagnostic Dashboards'],
      'Variable Frequency Drives': ['Conveyor Systems', 'Centrifugal Pumps', 'HVAC Fans', 'Extruder Drives', 'Compressors', 'Hoists and Cranes'],
      'Servo Drives': ['CNC Machining', 'Packaging Machines', 'Robotics', 'Printing Presses', 'Textile Machines', 'Pick-and-Place'],
      'CNC Controllers': ['Milling Machines', 'Lathes', 'Plasma Cutters', 'Laser Cutters', 'Waterjet Cutters', 'EDM Machines'],
      'PAC Controllers': ['Process Control', 'Advanced Manufacturing', 'Oil & Gas', 'Pharmaceutical', 'Food & Beverage', 'Water Treatment'],
      'Remote I/O Systems': ['Distributed Equipment', 'Remote Monitoring', 'Process Plants', 'Substation Automation', 'Marine Systems', 'Oil Rigs'],
      'Industrial PC': ['PC-Based Control', 'Vision Inspection', 'Data Acquisition', 'Edge Computing', 'Gateway Systems', 'Machine Vision'],
      'Embedded Controllers': ['Small Automation', 'Temperature Control', 'Lighting Control', 'Pump Management', 'Access Control', 'Energy Management'],
      'Motion Controllers': ['Pick-and-Place', 'Packaging', 'Labeling', 'Assembly', 'Test Equipment', 'Robotics'],
      'Safety Controllers': ['Press Protection', 'Robotic Cells', 'Conveyor Safety', 'Assembly Stations', 'Packaging Safety', 'Process Safety'],
      'PID Controllers': ['Temperature Control', 'Pressure Regulation', 'Flow Control', 'Level Control', 'pH Control', 'Humidity Control']
    }
  },
  'Controllers': {
    prefix: 'ctr',
    subcategories: ['Temperature Controllers', 'Process Controllers', 'Pressure Controllers', 'Flow Controllers', 'Level Controllers', 'Humidity Controllers', 'pH Controllers', 'Conductivity Controllers', 'Multi-Loop Controllers', 'Programmable Controllers', 'Batch Controllers', 'Ratio Controllers'],
    series: ['UDC3200', 'DCS3000', 'UT150', 'FC500', 'LC200', 'HC300', 'PH1000', 'CM500', 'MLC800', 'P1500', 'B300', 'R200'],
    materials: ['Polycarbonate Front, Metal Case', 'Stainless Steel Enclosure', 'Aluminum Front Panel', 'ABS Plastic', 'Fiberglass Enclosure', 'Polyester Powder Coated'],
    applications: {
      'Temperature Controllers': ['Industrial Furnaces', 'Heat Treatment Ovens', 'Chemical Reactors', 'Environmental Chambers', 'Injection Molding', 'Extrusion Lines'],
      'Process Controllers': ['Chemical Plants', 'Oil Refineries', 'Power Stations', 'Pharmaceutical', 'Food Processing', 'Steel Making'],
      'Pressure Controllers': ['Hydraulic Systems', 'Pneumatic Systems', 'Compressor Stations', 'Pipeline Regulation', 'Test Benches', 'Autoclaves'],
      'Flow Controllers': ['Chemical Dosing', 'Water Treatment', 'Fuel Metering', 'Gas Distribution', 'PID Flow Loops', 'Irrigation'],
      'Level Controllers': ['Storage Tanks', 'Boiler Drums', 'Silo Monitoring', 'Chemical Tanks', 'Wastewater Basins', 'Reservoirs'],
      'Humidity Controllers': ['Clean Rooms', 'Greenhouses', 'Data Centers', 'Museums', 'HVAC', 'Pharmaceutical Storage'],
      'pH Controllers': ['Water Treatment', 'Chemical Processing', 'Aquaculture', 'Food & Beverage', 'Pharmaceutical', 'Electroplating'],
      'Conductivity Controllers': ['Water Purity', 'CIP Systems', 'Cooling Towers', 'Boiler Blowdown', 'Chemical Concentration', 'Desalination'],
      'Multi-Loop Controllers': ['Temperature Zones', 'Extrusion Barrel', 'Multi-zone Furnaces', 'Plastic Molding', 'Die Casting', 'Glass Melting'],
      'Programmable Controllers': ['Recipe Management', 'Batch Processes', 'CIP Cycles', 'Sterilization', 'Drying Ovens', 'Autoclaves'],
      'Batch Controllers': ['Chemical Batching', 'Food Blending', 'Cement Mixing', 'Pharmaceutical Formulation', 'Paint Mixing', 'Plastic Compounding'],
      'Ratio Controllers': ['Gas Mixing', 'Combustion Control', 'Chemical Blending', 'Polymer Production', 'Air/Fuel Ratio', 'Dosing Systems']
    }
  },
  'Sensors': {
    prefix: 'sen',
    subcategories: ['Temperature Sensors', 'Pressure Sensors', 'Level Sensors', 'Flow Sensors', 'Proximity Sensors', 'Photoelectric Sensors', 'Ultrasonic Sensors', 'Gas Sensors', 'Humidity Sensors', 'Vibration Sensors', 'Force Sensors', 'Torque Sensors'],
    series: ['SITRANS', '2600T', 'VEGAPULS', 'OPTIBAR', 'Deltabar', 'OPTIFLUX', 'CQ Series', 'WT Series', 'GX Series', 'V Series', 'UF Series', 'T Series'],
    materials: ['Stainless Steel 316L', 'Hastelloy C276', 'PVC', 'Polyamide Housing', 'Aluminum Housing', 'PTFE Coated', 'Ceramic Diaphragm', 'Silicon MEMS'],
    applications: {
      'Temperature Sensors': ['Chemical Reactor Temperature', 'Pipeline Temperature', 'Storage Tank Monitoring', 'HVAC Temperature Control', 'Engine Monitoring', 'Process Heaters'],
      'Pressure Sensors': ['Pipeline Pressure', 'Tank Pressure', 'Hydraulic System', 'Pneumatic System', 'Filter Monitoring', 'Compressor Discharge'],
      'Level Sensors': ['Water Tanks', 'Oil Storage', 'Chemical Tanks', 'Silos', 'Fuel Depots', 'Wastewater Tanks'],
      'Flow Sensors': ['Water Metering', 'Oil Flow', 'Gas Flow', 'Chemical Dosing', 'Steam Flow', 'Custody Transfer'],
      'Proximity Sensors': ['Automation Lines', 'Conveyor Systems', 'Packaging Machines', 'Machine Tools', 'Assembly Robots', 'Position Detection'],
      'Photoelectric Sensors': ['Packaging Inspection', 'Bottle Filling', 'Conveyor Counting', 'Object Detection', 'Label Detection', 'Quality Control'],
      'Ultrasonic Sensors': ['Tank Level', 'Distance Measurement', 'Object Detection', 'Collision Avoidance', 'Fill Level', 'Web Tension'],
      'Gas Sensors': ['H2S Detection', 'CO2 Monitoring', 'O2 Analyzers', 'CH4 Gas Detection', 'CO Detection', 'NOx Monitoring'],
      'Humidity Sensors': ['Clean Room Monitoring', 'HVAC Control', 'Pharmaceutical Storage', 'Food Storage', 'Museum Environment', 'Data Centers'],
      'Vibration Sensors': ['Motor Monitoring', 'Pump Condition', 'Fan Monitoring', 'Compressor Vibration', 'Turbine Vibration', 'Structural Health'],
      'Force Sensors': ['Press Monitoring', 'Robotic Grip Force', 'Assembly Press', 'Test Stands', 'Weighing Systems', 'Load Monitoring'],
      'Torque Sensors': ['Engine Test Stands', 'Drivetrain Testing', 'Torque Wrench Calibration', 'Bolt Tensioning', 'Machine Monitoring', 'Power Tool Testing']
    }
  },
  'Hydraulics': {
    prefix: 'hyd',
    subcategories: ['Pumps', 'Motors', 'Cylinders', 'Directional Control Valves', 'Pressure Control Valves', 'Flow Control Valves', 'Cartridge Valves', 'Power Units', 'Accumulators', 'Filters', 'Heat Exchangers', 'Fittings & Connectors'],
    series: ['A4VSO', 'MCR', 'CD250', 'D1VW', 'DBET', 'FC', 'CE', 'HPU', 'SB330', 'HF', 'AC', 'A-K'],
    materials: ['Cast Iron Housing', 'Aluminum Body', 'Ductile Iron', 'Steel Piston', 'Bronze Rotating Group', 'Forged Steel Head', 'Nodular Cast Iron', 'Carbon Steel Manifold'],
    applications: {
      'Pumps': ['Hydraulic Power Units', 'Press Hydraulics', 'Mobile Equipment', 'Marine Deck Machinery', 'Mining Equipment', 'Industrial Machinery'],
      'Motors': ['Conveyor Drives', 'Winch Drives', 'Mixer Drives', 'Auger Drives', 'Crane Slewing', 'Roller Drives'],
      'Cylinders': ['Press Rams', 'Injection Molding Clamping', 'Excavator Arms', 'Forklift Mast', 'Dump Trucks', 'Machine Tool Feed'],
      'Directional Control Valves': ['Mobile Hydraulics', 'Industrial Machinery', 'Machine Tools', 'Material Handling', 'Agricultural Equipment', 'Construction Equipment'],
      'Pressure Control Valves': ['Pump Unloading', 'System Relief', 'Sequence Control', 'Counterbalance', 'Brake Systems', 'Clutch Control'],
      'Flow Control Valves': ['Actuator Speed Control', 'Feed Rate Control', 'Tool Feed', 'Synchronization', 'Conveyor Speed', 'Crane Lowering'],
      'Cartridge Valves': ['Compact Manifolds', 'Mobile Systems', 'Hydraulic Presses', 'Plastic Molding', 'Agricultural Controls', 'Industrial Manifolds'],
      'Power Units': ['Machine Tools', 'Press Systems', 'Test Stands', 'Lubrication Systems', 'Clamping Systems', 'Elevator Drives'],
      'Accumulators': ['Piston Accumulators', 'Bladder Accumulators', 'Diaphragm Accumulators', 'Energy Storage', 'Pulsation Dampening', 'Emergency Power'],
      'Filters': ['Return Line', 'Pressure Line', 'Suction Line', 'Offline Filtration', 'Breathers', 'Oil Conditioners'],
      'Heat Exchangers': ['Oil Coolers', 'Chiller Systems', 'Radiators', 'Plate Heat Exchangers', 'Shell and Tube', 'Fan Cooled'],
      'Fittings & Connectors': ['Tube Fittings', 'Hose Connectors', 'Flange Adaptors', 'Quick Couplings', 'Rotary Joints', 'Pipe Adaptors']
    }
  },
  'Pneumatics': {
    prefix: 'pnm',
    subcategories: ['Cylinders', 'Directional Control Valves', 'Flow Control Valves', 'Pressure Regulators', 'FRL Units', 'Fittings & Tubing', 'Vacuum Components', 'Actuators', 'Air Preparation Units', 'Solenoid Valves', 'Pneumatic Motors', 'Air Bearings'],
    series: ['DSNU', 'VUVS', 'GRLA', 'LRMA', 'FRC', 'QS', 'VN', 'DFPD', 'MS', 'VUV', 'AM', 'SMB'],
    materials: ['Anodized Aluminum', 'PBT (Polybutylene Terephthalate)', 'Stainless Steel', 'Nickel-Plated Brass', 'Polyurethane', 'Nylon (PA12)', 'Aluminum Alloy', 'Composite Polymer'],
    applications: {
      'Cylinders': ['Pick-and-Place Units', 'Pneumatic Clamping', 'Conveyor Stops', 'Packaging Actuators', 'Material Ejection', 'Gate Opening'],
      'Directional Control Valves': ['Automation Lines', 'Packaging Equipment', 'Robotic Grippers', 'Conveyor Switching', 'Sorting Systems', 'Assembly Stations'],
      'Flow Control Valves': ['Cylinder Speed Control', 'Actuator Dampening', 'Air Tool Regulation', 'Conveyor Control', 'Feed Rate Control', 'Timing Adjustment'],
      'Pressure Regulators': ['Machine Shops', 'Air Tool Supply', 'Instrument Air', 'Control Valve Supply', 'Clean Room Air', 'Process Air'],
      'FRL Units': ['Compressed Air Systems', 'Factory Air Prep', 'Instrument Air', 'Paint Spray Booths', 'Machine Shops', 'Packaging Lines'],
      'Fittings & Tubing': ['Pneumatic Circuits', 'Air Distribution', 'Vacuum Lines', 'Conveyor Air', 'Coolant Supply', 'Instrument Lines'],
      'Vacuum Components': ['Pick-up Systems', 'Vacuum Gripping', 'Packaging Handling', 'Thermoforming', 'Vacuum Clamping', 'Filling Machines'],
      'Actuators': ['Valve Actuation', 'Damper Control', 'Louver Control', 'Clamp Operation', 'Transfer Systems', 'Indexing Devices'],
      'Air Preparation Units': ['Compressor Rooms', 'Industrial Air Systems', 'Laboratory Air', 'Dental Air', 'Pharmaceutical Air', 'Paint Booths'],
      'Solenoid Valves': ['Automated Assembly', 'Pneumatic Control Circuits', 'Packaging Machines', 'Textile Machinery', 'Printing Presses', 'Conveyor Systems'],
      'Pneumatic Motors': ['Hazardous Environments', 'Mixer Drives', 'Hoist Systems', 'Agitator Drives', 'Tool Drives', 'Spindle Drives'],
      'Air Bearings': ['High-Speed Spindles', 'Inspection Tables', 'Coordinate Measuring', 'Wafer Handling', 'Magnetic Resonance', 'Optical Positioning']
    }
  },
  'Turbine Parts': {
    prefix: 'trb',
    subcategories: ['Turbine Blades', 'Nozzles', 'Combustors', 'Turbine Discs', 'Bearings', 'Seals', 'Shrouds', 'Transition Pieces', 'Fuel Nozzles', 'Exhaust Diffusers', 'Vane Rings', 'Rotor Assemblies'],
    series: ['7FA', 'SGT-800', 'M501J', 'GT26', 'AE94.3A', 'Taurus 70', 'M7A-03', 'MGT 6100', 'SoloNOx', 'Planar', 'GT13E2', 'LM2500'],
    materials: ['GTD-444 DS Superalloy', 'Inconel 738', 'Hastelloy X', 'Mar-M-247', 'Nimonic 263', 'CM247LC DS', 'Rene 80', 'Udimet 720', 'Stellite 6', 'Incoloy 909', 'Haynes 230', 'Waspaloy'],
    applications: {
      'Turbine Blades': ['Power Generation', 'Combined Cycle Plants', 'Cogeneration', 'Mechanical Drive', 'Gas Compression', 'Marine Propulsion'],
      'Nozzles': ['Turbine Expanders', 'Gas Turbines', 'Steam Turbines', 'Turbochargers', 'Jet Engines', 'Process Expanders'],
      'Combustors': ['Natural Gas Firing', 'Oil Firing', 'Dual Fuel', 'Biogas Firing', 'Syngas Firing', 'Hydrogen Co-Firing'],
      'Turbine Discs': ['Gas Turbines', 'Steam Turbines', 'Compressor Discs', 'Fan Discs', 'Power Turbines', 'Turbo Expanders'],
      'Bearings': ['Thrust Bearings', 'Journal Bearings', 'Tilting Pad', 'Magnetic Bearings', 'Roller Bearings', 'Ball Bearings'],
      'Seals': ['Labyrinth Seals', 'Brush Seals', 'Carbon Seals', 'Tip Seals', 'Interstage Seals', 'Oil Seals'],
      'Shrouds': ['Turbine Tip Shrouds', 'Vane Shrouds', 'Heat Shrouds', 'Seal Shrouds', 'Transition Shrouds', 'Floor Shrouds'],
      'Transition Pieces': ['Can-Annular Systems', 'Combustor Outlet', 'Turbine Inlet', 'Flow Transition', 'Silo Combustors', 'Annular Systems'],
      'Fuel Nozzles': ['Gas Fuel Nozzles', 'Liquid Fuel Nozzles', 'Dual Fuel Nozzles', 'Pilot Nozzles', 'Main Nozzles', 'Atomizers'],
      'Exhaust Diffusers': ['Gas Turbine Exhaust', 'Steam Turbine Exhaust', 'Heat Recovery', 'Silencer Systems', 'Stack Connections', 'Waste Heat'],
      'Vane Rings': ['Compressor Vanes', 'Turbine Vanes', 'Adjustable Vanes', 'Variable Stators', 'IGVs', 'Exit Vanes'],
      'Rotor Assemblies': ['Gas Turbine Rotors', 'Steam Turbine Rotors', 'Compressor Rotors', 'Fan Rotors', 'Expander Rotors', 'Turbo Rotors']
    }
  },
  'Electrical': {
    prefix: 'elc',
    subcategories: ['Circuit Breakers', 'Contactors', 'Relays', 'Transformers', 'Switchgear', 'Distribution Boards', 'Motor Control Centers', 'Cable Trays', 'Busbar Systems', 'Overcurrent Protection', 'Surge Protection', 'Power Factor Correction'],
    series: ['SACE S2N', 'AF Range', 'RXM Series', 'TPM', 'MNS', 'MCC', 'MCC-E', 'CXL', 'LiSA', 'MS Range', 'OVR', 'PFC'],
    materials: ['Thermoset Plastic Enclosure', 'Steel Enclosure', 'Polycarbonate', 'Aluminum Housing', 'Glass Fiber Polyester', 'Sheet Steel', 'Epoxy Cast Resin', 'Copper Windings'],
    applications: {
      'Circuit Breakers': ['Main Switchboards', 'Motor Control Centers', 'Industrial Power Panels', 'Generator Protection', 'Distribution Panels', 'Substation Protection'],
      'Contactors': ['Motor Starting', 'Lighting Control', 'Heater Control', 'Capacitor Switching', 'Standby Generator', 'Pump Control'],
      'Relays': ['Protection Relays', 'Motor Protection', 'Transformer Protection', 'Feeder Protection', 'Busbar Protection', 'Control Relays'],
      'Transformers': ['Power Distribution', 'Control Circuit Isolation', 'Lighting Step-Down', 'Motor Starting', 'Rectifier Feed', 'UPS Isolation'],
      'Switchgear': ['Primary Distribution', 'Secondary Distribution', 'Industrial Plants', 'Commercial Buildings', 'Power Utility', 'Marine Switchboards'],
      'Distribution Boards': ['Lighting Panels', 'Power Panels', 'Sub-Distribution', 'Apartment Boards', 'Commercial Distribution', 'Industrial DBs'],
      'Motor Control Centers': ['Fan Control', 'Pump Control', 'Compressor Control', 'Conveyor Control', 'HVAC Control', 'Process Control'],
      'Cable Trays': ['Power Cabling', 'Data Cabling', 'Instrument Cabling', 'Tray Covers', 'Ladder Trays', 'Wire Mesh Trays'],
      'Busbar Systems': ['Switchgear Connections', 'MCC Power Feed', 'Riser Systems', 'Power Distribution', 'Generator Connections', 'Transformer Output'],
      'Overcurrent Protection': ['Feeder Protection', 'Motor Protection', 'Cable Protection', 'Transformer Protection', 'Generator Protection', 'Capacitor Protection'],
      'Surge Protection': ['SPD Type 1', 'SPD Type 2', 'SPD Type 3', 'Data Line SPD', 'PV SPD', 'Telecom SPD'],
      'Power Factor Correction': ['Industrial PFC', 'Commercial PFC', 'Automatic Banks', 'Fixed Banks', 'Detuned Banks', 'Active Filters']
    }
  },
  'Filters': {
    prefix: 'flt',
    subcategories: ['Hydraulic Filters', 'Air Filters', 'Oil Filters', 'Fuel Filters', 'Water Filters', 'Gas Filters', 'Steam Filters', 'Chemical Filters', 'Vacuum Filters', 'Bag Filters', 'Cartridge Filters', 'Membrane Filters'],
    series: ['HF Series', 'AFF Series', 'OF Series', 'FF Series', 'WF Series', 'GF Series', 'SF Series', 'CF Series', 'VF Series', 'BF Series', 'CFC Series', 'MF Series'],
    materials: ['Micro-Fiberglass', 'Cellulose Paper', 'Stainless Steel Mesh', 'Polypropylene', 'PTFE Membrane', 'Activated Carbon', 'Polyester Felt', 'Nylon Mesh', 'Ceramic Element', 'Sintered Bronze', 'Glass Fiber', 'Cotton Wound'],
    applications: {
      'Hydraulic Filters': ['Hydraulic Power Units', 'Mobile Systems', 'Servo Valve Protection', 'Machine Tools', 'Press Systems', 'Test Stands'],
      'Air Filters': ['Compressed Air Systems', 'Engine Intake', 'Ventilation', 'Clean Rooms', 'Gas Turbine Intake', 'Pneumatic Systems'],
      'Oil Filters': ['Lubrication Systems', 'Gearbox Protection', 'Turbine Lube Oil', 'Transformer Oil', 'Hydraulic Oil', 'Engine Oil'],
      'Fuel Filters': ['Diesel Generators', 'Gas Turbine Fuel', 'Boiler Fuel', 'Vehicle Fuel', 'Marine Fuel', 'Aviation Fuel'],
      'Water Filters': ['Process Water', 'Cooling Water', 'Wastewater', 'Drinking Water', 'DI Water', 'Boiler Feedwater'],
      'Gas Filters': ['Natural Gas', 'Process Gas', 'Biogas', 'Instrument Air', 'Flue Gas', 'Hydrogen Gas'],
      'Steam Filters': ['Clean Steam', 'Process Steam', 'Pharmaceutical Steam', 'Culinary Steam', 'HVAC Steam', 'Power Steam'],
      'Chemical Filters': ['Acid Filtration', 'Solvent Filtration', 'Caustic Filtration', 'Polymer Melt', 'Coating Filtration', 'Catalyst Recovery'],
      'Vacuum Filters': ['Vacuum Dehydration', 'Oil Purification', 'Transformer Drying', 'Vacuum Systems', 'Filtration Skids', 'Lube Oil Cleanup'],
      'Bag Filters': ['Dust Collection', 'Powder Processing', 'Cement Plants', 'Food Processing', 'Pharmaceutical', 'Chemical Dust'],
      'Cartridge Filters': ['Water Treatment', 'Chemical Processing', 'Food & Beverage', 'Pharmaceutical', 'Electronics Manufacturing', 'Oil Refining'],
      'Membrane Filters': ['Water Purification', 'Wastewater Treatment', 'Desalination', 'Food Processing', 'Biotech', 'Gas Separation']
    }
  },
  'Seals': {
    prefix: 'sl',
    subcategories: ['Mechanical Seals', 'O-Rings', 'Oil Seals', 'Gaskets', 'Packing Rings', 'Lip Seals', 'Rotary Seals', 'Piston Seals', 'Rod Seals', 'Molded Packings', 'Hydraulic Seals', 'Pneumatic Seals'],
    series: ['Type 210', 'OR Series', 'BP Series', 'GS Series', 'PT Series', 'LIP Series', 'ROT Series', 'PIS Series', 'ROD Series', 'MP Series', 'HS Series', 'PS Series'],
    materials: ['Carbon Graphite', 'Ceramic (Alumina 99.5%)', 'Tungsten Carbide', 'Silicon Carbide', 'Buna-N (Nitrile)', 'Viton (FKM)', 'EPDM', 'PTFE', 'Polyurethane (AU)', 'Nylon', 'PEEK', 'Aramid Fiber'],
    applications: {
      'Mechanical Seals': ['Centrifugal Pump Sealing', 'Mixer Shaft Sealing', 'Compressor Sealing', 'Agitator Sealing', 'Fan Shaft Sealing', 'Blower Sealing'],
      'O-Rings': ['Hydraulic Fittings', 'Pneumatic Fittings', 'Flange Seals', 'Valve Seats', 'Cylinder Seals', 'Connector Seals'],
      'Oil Seals': ['Gearbox Input Shaft', 'Bearing Housings', 'Engine Crankshafts', 'Axle Seals', 'Transmission Case', 'Pump Shafts'],
      'Gaskets': ['Flange Joints', 'Manhole Covers', 'Heat Exchangers', 'Compressor Heads', 'Valve Bonnets', 'Pump Casing'],
      'Packing Rings': ['Valve Stem Sealing', 'Pump Shaft Packing', 'Reciprocating Compressors', 'Expansion Joints', 'Globe Valve Packing', 'Gate Valve Packing'],
      'Lip Seals': ['Wheel Bearings', 'Spindle Housings', 'Electric Motors', 'Water Pumps', 'Conveyor Rollers', 'Washing Machines'],
      'Rotary Seals': ['Rotary Joints', 'Swivel Connections', 'Rotary Actuators', 'Rotary Feedthroughs', 'Drum Dryers', 'Centrifuge Seals'],
      'Piston Seals': ['Hydraulic Cylinders', 'Pneumatic Cylinders', 'Shock Absorbers', 'Master Cylinders', 'Clutch Actuators', 'Brake Cylinders'],
      'Rod Seals': ['Hydraulic Cylinders', 'Pneumatic Cylinders', 'Die Casting', 'Injection Molding', 'Hydraulic Presses', 'Forklift Mast'],
      'Molded Packings': ['Valve Stem Packings', 'Pump Packings', 'Autoclave Doors', 'High-Pressure Vessels', 'Blowout Preventers', 'Pipeline Valves'],
      'Hydraulic Seals': ['Hydraulic Cylinders', 'Power Packs', 'Control Valves', 'Piston Accumulators', 'Hydraulic Motors', 'Hydraulic Pumps'],
      'Pneumatic Seals': ['Pneumatic Cylinders', 'Control Valves', 'Air Motors', 'Vacuum Components', 'Air Brakes', 'Pneumatic Actuators']
    }
  },
  'Gears': {
    prefix: 'ger',
    subcategories: ['Helical-Bevel Gearboxes', 'Helical Gearboxes', 'Worm Gearboxes', 'Bevel Gearboxes', 'Planetary Gearboxes', 'Spur Gears', 'Helical Gears', 'Bevel Gears', 'Worm Gears', 'Rack and Pinion', 'Gear Racks', 'Ring Gears'],
    series: ['K Series', 'R Series', 'S Series', 'B Series', 'P Series', 'SpurMaster', 'HeliMaster', 'BevelPro', 'WormDrive', 'RackPro', 'GR Series', 'RingMaster'],
    materials: ['Cast Iron Housing', 'Steel Gears (Case-Hardened)', 'Stainless Steel Gears', 'Bronze Worm Wheels', 'Ductile Iron', 'Aluminum Housing', 'Alloy Steel 4140', 'Nylon (Plastic Gears)', 'Cast Steel', 'Forged Steel', 'Sintered Metal', 'Polyacetal'],
    applications: {
      'Helical-Bevel Gearboxes': ['Conveyor Drives', 'Mixer Agitators', 'Packaging Lines', 'Material Handling', 'Pump Drives', 'Fan Drives'],
      'Helical Gearboxes': ['Conveyor Systems', 'Crusher Drives', 'Mixers', 'Screw Conveyors', 'Hoist Drives', 'Cooling Tower Fans'],
      'Worm Gearboxes': ['Roller Conveyors', 'Positioning Drives', 'Gate Mechanisms', 'Lifting Platforms', 'Towing Winches', 'Palletizers'],
      'Bevel Gearboxes': ['Right-Angle Drives', 'Pump Drives', 'Milling Machines', 'Transfer Lines', 'Paper Mill Rolls', 'Marine Drives'],
      'Planetary Gearboxes': ['Robotic Arms', 'Wind Turbines', 'Heavy Equipment', 'Excavator Drives', 'Track Drives', 'Rotary Tables'],
      'Spur Gears': ['Machine Tools', 'Pump Drives', 'Simple Transmissions', 'Conveyor Rollers', 'Clock Mechanisms', 'General Power Transmission'],
      'Helical Gears': ['Higher Speed Drives', 'Noise-Sensitive Applications', 'Automotive Transmissions', 'Industrial Mixers', 'Steel Mills', 'Compressors'],
      'Bevel Gears': ['Automotive Differentials', 'Machine Tool Drives', 'Transfer Cases', 'Hand Drills', 'Angle Grinders', 'Agricultural PTO'],
      'Worm Gears': ['Lifting Equipment', 'Conveyors', 'Packaging Machines', 'Hoists', 'Positioning Tables', 'Machine Slides'],
      'Rack and Pinion': ['Linear Motion', 'CNC Axes', 'Gantry Robots', 'Railway Systems', 'Press Feed', 'Transfer Lines'],
      'Gear Racks': ['Machine Tool Tables', 'Linear Motion Systems', 'Assembly Lines', 'Cutting Machines', 'Transfer Systems', 'Packaging'],
      'Ring Gears': ['Heavy Machinery', 'Ball Mills', 'Rotary Kilns', 'Forklift Drives', 'Agricultural Machinery', 'Construction Machinery']
    }
  },
  'Couplings': {
    prefix: 'cou',
    subcategories: ['Flexible Couplings', 'Rigid Couplings', 'Gear Couplings', 'Grid Couplings', 'Disc Couplings', 'Elastomeric Couplings', 'Jaw Couplings', 'Beam Couplings', 'Bellows Couplings', 'Chain Couplings', 'Fluid Couplings', 'Safety Couplings'],
    series: ['N-EUPEX', 'L-Coupling', 'GC Series', 'G-Coupling', 'D-Coupling', 'E-Coupling', 'Jaw-Flex', 'Beam-Flex', 'Bellows-Plus', 'CC Series', 'F-Coupling', 'SG-Coupling'],
    materials: ['Steel Hubs', 'Cast Iron Hubs', 'Aluminum Hubs', 'Stainless Steel', 'Polyurethane Bushings', 'Rubber Elements', 'Nylon', 'Composite Material', 'Bronze Bushings', 'Duplex Stainless', 'Titanium Alloy', 'Engineering Plastics'],
    applications: {
      'Flexible Couplings': ['Centrifugal Pumps', 'Industrial Fans', 'Screw Compressors', 'Generators', 'Pump Sets', 'Motor-Gearbox'],
      'Rigid Couplings': ['Vertical Shafts', 'Elevator Drives', 'Screw Pumps', 'Propeller Shafts', 'Mixer Drives', 'Test Stands'],
      'Gear Couplings': ['Mill Drives', 'Crusher Drives', 'Kiln Drives', 'Cooling Towers', 'Steel Mill Rolls', 'Marine Drives'],
      'Grid Couplings': ['Conveyor Drives', 'Mixer Drives', 'Pump Drives', 'Fan Drives', 'Hoist Drives', 'Dragline Drives'],
      'Disc Couplings': ['High-Speed Compressors', 'Turbine Drives', 'Centrifuge Drives', 'Pump Drives', 'Steam Turbines', 'Gas Turbines'],
      'Elastomeric Couplings': ['Engine Drives', 'PTO Drives', 'Generator Sets', 'Hydraulic Pumps', 'Compressor Drives', 'Marine Pods'],
      'Jaw Couplings': ['General Purpose', 'Light Industrial', 'Hydraulic Pump Drives', 'Small Conveyors', 'Mixers', 'Packaging'],
      'Beam Couplings': ['Servo Motors', 'Encoder Drives', 'Medical Equipment', 'Robotic Joints', 'Linear Actuators', 'Precision Positioning'],
      'Bellows Couplings': ['Encoder Mounting', 'Stepper Motors', 'CNC Machines', 'Measuring Equipment', 'Test Equipment', 'Robotics'],
      'Chain Couplings': ['Screw Conveyors', 'Bucket Elevators', 'Tube Mills', 'Sinter Plants', 'Ash Handlers', 'Coke Pushers'],
      'Fluid Couplings': ['Soft-Start Drives', 'Conveyor Starters', 'Centrifuges', 'Ball Mills', 'Crushers', 'Mixers'],
      'Safety Couplings': ['Printing Presses', 'Packaging Lines', 'Textile Machines', 'Conveyor Drives', 'Roller Drives', 'Feed Drives']
    }
  },
  'Fasteners': {
    prefix: 'fst',
    subcategories: ['Bolts', 'Nuts', 'Washers', 'Screws', 'Studs', 'Rivets', 'Pins', 'Anchors', 'Threaded Rods', 'Socket Products', 'Lock Washers', 'Insert Nuts'],
    series: ['Grade 8 Hex', 'Grade 2 H', 'Grade A', 'Stainless 304', 'B7 Stud', 'Structural Rivet', 'Coiled Pin', 'Wedge Anchor', 'All-Thread', 'Socket Cap', 'Split Lock', 'Nutsert'],
    materials: ['4140 Alloy Steel', '304 Stainless Steel', '316 Stainless Steel', 'Carbon Steel 1018', 'B7 Chromoly', 'Brass 360', 'Silicon Bronze', 'Aluminum 2024', 'A286 Stainless', 'Grade 5 Titanium', 'Nylon 6/6', 'Copper Alloy C110'],
    applications: {
      'Bolts': ['Heavy Equipment Assembly', 'Structural Steel', 'Machine Tool Fixturing', 'Mining Equipment', 'Bridge Construction', 'Pressure Vessel Flanges'],
      'Nuts': ['Structural Connections', 'Flange Joints', 'Wheel Mounting', 'Pipe Flanges', 'Machine Assembly', 'Conveyor Assembly'],
      'Washers': ['Flange Bolting', 'Structural Joints', 'Bearing Mounting', 'Machine Leveling', 'Electrical Connections', 'Pipe Supports'],
      'Screws': ['Machine Assembly', 'Sheet Metal Work', 'Enclosure Manufacturing', 'Panel Mounting', 'Instrument Mounting', 'Cable Trays'],
      'Studs': ['Flange Gasketing', 'Heat Exchanger Assembly', 'Valve Bonnet', 'Cylinder Head', 'Turbine Casing', 'Compressor Flanges'],
      'Rivets': ['Structural Steel', 'Building Construction', 'Shipbuilding', 'Aircraft Assembly', 'Heavy Fabrication', 'Bridge Building'],
      'Pins': ['Hinge Pins', 'Clevis Pins', 'Linkage Pins', 'Articulation Joints', 'Crane Wrist Pins', 'Cylinder Mounting'],
      'Anchors': ['Heavy Machinery Mounting', 'Structural Steel Columns', 'Overhead Cranes', 'Conveyor Supports', 'Equipment Foundations', 'Rack Anchoring'],
      'Threaded Rods': ['Pipe Supports', 'Cable Tray Supports', 'Ductwork Hangers', 'Sway Bracing', 'Equipment Tie-Downs', 'Structural Bracing'],
      'Socket Products': ['Machine Assembly', 'Die Fixturing', 'Mold Assembly', 'Precision Equipment', 'Aerospace Fixtures', 'Tool and Die'],
      'Lock Washers': ['Vibration-Prone Assemblies', 'Engine Mounting', 'Pump Baseplates', 'Motor Flanges', 'Compressor Assembly', 'Generator Connections'],
      'Insert Nuts': ['Plastic Components', 'Wood Connections', 'Composite Panels', 'Sheet Metal', 'Enclosure Assembly', 'Furniture Manufacturing']
    }
  },
  'Manifolds': {
    prefix: 'mnf',
    subcategories: ['Hydraulic Manifolds', 'Pneumatic Manifolds', 'Subplates', 'Valve Manifolds', 'Distribution Manifolds', 'Instrument Manifolds', 'Flanged Manifolds', 'Block Manifolds', 'Modular Manifolds', 'Cartridge Manifolds', 'Pilot Manifolds', 'Stack Manifolds'],
    series: ['D03 Series', 'D-Sub', 'SP Series', 'VM Series', 'DM Series', 'IM Series', 'FL Series', 'BK Series', 'MOD Series', 'CM Series', 'PM Series', 'ST Series'],
    materials: ['6061-T6 Aluminum (Hard Anodized)', 'Ductile Iron (Grey Iron)', 'Steel Billet', 'Stainless Steel 316', 'Aluminum Bronze', 'Carbon Steel Plate', 'Cast Iron Meehanite', 'Cast Aluminum A356'],
    applications: {
      'Hydraulic Manifolds': ['Hydraulic Power Units', 'Machine Tool Hydraulics', 'Mobile Equipment', 'Press Control Systems', 'Mobile Hydraulics', 'Test Stands'],
      'Pneumatic Manifolds': ['Packaging Equipment', 'Assembly Systems', 'Material Handling', 'Robotic Controls', 'Automation Stations', 'Clean Room Air Systems'],
      'Subplates': ['Valve Mounting', 'Pump Mounting', 'Hydraulic Power Packs', 'Manifold Assemblies', 'Test Fixtures', 'Hydraulic Blocks'],
      'Valve Manifolds': ['Directional Control', 'Pressure Control', 'Flow Regulation', 'Proportional Valves', 'Servo Valve Banks', 'Mobile Controllers'],
      'Distribution Manifolds': ['Hydraulic Fluid Distribution', 'Pneumatic Air Distribution', 'Lubrication Systems', 'Coolant Distribution', 'Chemical Dosing', 'Air Sampling'],
      'Instrument Manifolds': ['Differential Pressure', 'Pressure Transmitter', 'Flow Transmitter', 'Level Transmitter', 'Pipeline Instrumentation', 'Process Analyzer'],
      'Flanged Manifolds': ['Pump Inlet/Outlet', 'Filter Housings', 'Heat Exchangers', 'High-Pressure Systems', 'Marine Hydraulics', 'Offshore'],
      'Block Manifolds': ['Integrated Circuits', 'Compact Power Units', 'Industrial Presses', 'Mobile Valve Blocks', 'Fan Drives', 'Hydrostatic Drives'],
      'Modular Manifolds': ['Expandable Systems', 'Plastic Molding', 'Die Casting', 'Packaging Machinery', 'Custom Assemblies', 'Production Lines'],
      'Cartridge Manifolds': ['Compact Hydraulics', 'Mobile Controls', 'Industrial Manifolds', 'Agricultural Systems', 'Construction Equipment', 'Material Handlers'],
      'Pilot Manifolds': ['Pneumatic Control Systems', 'Valve Piloting', 'Safety Systems', 'Remote Actuation', 'Proportional Control', 'Sequence Control'],
      'Stack Manifolds': ['Multi-Machine Centers', 'Transfer Lines', 'High-Speed Assembly', 'Multiple Processes', 'Centralized Control', 'Factory Automation']
    }
  },
  'PLC Accessories': {
    prefix: 'plc',
    subcategories: ['I/O Modules', 'Power Supplies', 'PLC Cables', 'Communication Modules', 'Signal Conditioners', 'Backplanes', 'Terminal Blocks', 'Remote I/O Stations', 'Memory Cards', 'Battery Modules', 'Programming Cables', 'Interface Modules'],
    series: ['SM 1200', 'PS 1200', 'CablePro', 'CP 1200', 'SC 2000', 'BP Series', 'TB Series', 'ET 200SP', 'MC Series', 'BM Series', 'PC Series', 'IM Series'],
    materials: ['Plastic Enclosure', 'Aluminum Housing', 'Steel Chassis', 'Polyamide (Terminal Blocks)', 'ABS Plastic', 'Die-Cast Zinc', 'Epoxy Sealed', 'Polycarbonate'],
    applications: {
      'I/O Modules': ['Sensor Signal Acquisition', 'Process Variable Monitoring', 'Temperature Sensing', 'Pressure Transducer Inputs', 'Valve Control Outputs', 'Motor Start Commands'],
      'Power Supplies': ['PLC Chassis Power', 'Field Loop Power', 'Sensor Power Supply', 'Actuator Power Supply', 'System Backup Power', 'Analog Loop Power'],
      'PLC Cables': ['Programming Connection', 'PLC to HMI Link', 'PLC to Drive Link', 'PLC to I/O Rack', 'PLC to PC Bridge', 'Ethernet Patch Cable'],
      'Communication Modules': ['Profinet Interface', 'EtherNet/IP Module', 'Modbus TCP Module', 'Profibus DP Master', 'DeviceNet Scanner', 'CANopen Master'],
      'Signal Conditioners': ['RTD to 4-20mA', 'TC to 4-20mA', 'Frequency to Analog', 'Isolator Units', 'Voltage Divider', 'Current Loop Isolator'],
      'Backplanes': ['Main Rack Backplane', 'Extension Rack', 'Local Bus Expander', 'Power Distribution', 'Heat Sink Assembly', 'DIN Rail Mount'],
      'Terminal Blocks': ['Feed-Through Blocks', 'Ground Blocks', 'Disconnect Blocks', 'Fused Blocks', 'LED Indicator Blocks', 'Multi-Level Blocks'],
      'Remote I/O Stations': ['Distributed Control', 'Remote Monitoring', 'Field Signal Acquisition', 'Substation Automation', 'Machine Mount I/O', 'Process Plant I/O'],
      'Memory Cards': ['Program Storage', 'Recipe Storage', 'Firmware Update', 'Data Logging', 'Retain Memory', 'Configuration Backup'],
      'Battery Modules': ['RAM Backup', 'RTC Power', 'System Buffer', 'UPS Replacement', 'Memory Retention', 'Clock Power'],
      'Programming Cables': ['USB to MPI', 'USB to Profibus', 'Ethernet Programming', 'Serial Console', 'USB to Serial', 'Diagnostic Cable'],
      'Interface Modules': ['HMI Interface', 'SCADA Gateway', 'OPC UA Server', 'Database Connector', 'Cloud Gateway', 'MQTT Interface']
    }
  }
};

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function pickN(arr, n) {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(n, arr.length));
}

function generateSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim('-');
}

function generateDescription(subcategory, name, series, material, features, applications, isShort) {
  if (isShort) {
    const shortDescrs = [
      `${subcategory.replace(/s$/, '')} model, ${material.split(',')[0]} construction, versatile industrial application.`,
      `Premium ${subcategory.toLowerCase().slice(0, -1)} component made from ${material.split(',')[0]}, suitable for demanding applications.`,
      `High-quality ${subcategory.toLowerCase().slice(0, -1)} with ${features.slice(0, 2).join(' and ')}, ${material.split(',')[0]} construction.`,
      `Industrial-grade ${subcategory.toLowerCase().slice(0, -1)} designed for ${applications[0]} and ${applications[1]} environments.`
    ];
    return pick(shortDescrs);
  }
  return `The ${name} is a premium ${subcategory.toLowerCase().slice(0, -1)} from the ${series} product line, engineered for ${applications.slice(0, 2).join(' and ')} and related industrial applications. Featuring a robust ${material} construction with advanced design elements, this component delivers reliable performance under demanding operating conditions.`;
}

function generateTechDescription(name, subcategory, material, applications) {
  return `${name} technical specification: Precision-engineered ${subcategory.toLowerCase().slice(0, -1)} with ${material}. Designed for ${applications.slice(0, 3).join(', ')}. Meets or exceeds all relevant industry standards for quality, safety, and performance in industrial environments.`;
}

function generateRandomSpecs(subcategory, category, material) {
  const specs = {
    'Size': `${pick(['2', '3', '4', '6', '8', '10', '12', '14', '16', '18', '20', '24'])} ${pick(['inches', 'mm', 'DN', 'NPS'])}`,
    'Material': material,
    'Operating Temperature': pick(['-20°C to +80°C', '-40°C to +100°C', '-29°C to +425°C', '-40°C to +120°C', '-10°C to +60°C', '-50°C to +150°C']),
    'Operating Pressure': pick(['10 bar', '16 bar', '25 bar', '40 bar', '100 bar', '160 bar', '250 bar', '350 bar', '420 bar', '600 bar']),
    'Weight': `${pick(['0.5', '1.2', '2.5', '3.8', '5.0', '8.5', '12', '18', '25', '35', '45', '60', '85', '120'])} kg`,
    'Standards': pick(['ISO 9001', 'DIN EN', 'ASME B16', 'IEC 61131', 'ISO 4401', 'AGMA 2001', 'API 600', 'SAE J429'])
  };
  return specs;
}

function generateFAQ(product) {
  const questions = [
    { q: `What is the typical lead time for ${product.name}?`, a: `Standard lead time is 2-4 weeks. Express delivery options are available upon request for urgent orders.` },
    { q: `Does this ${product.subcategory.toLowerCase().slice(0, -1)} come with a warranty?`, a: `Yes, ZENTRYO provides a standard 24-month warranty against manufacturing defects. Extended warranty options are available.` },
    { q: `What certifications does this product hold?`, a: `This product is certified with ${product.certifications.join(', ')}. Full documentation is available upon request.` },
    { q: `Can this component be customized for specific applications?`, a: `Yes, ZENTRYO offers customization services including special materials, coatings, dimensions, and packaging. Contact our engineering team.` },
    { q: `Is technical support available for installation?`, a: `Yes, ZENTRYO provides full technical support including installation guidance, troubleshooting, and maintenance documentation.` }
  ];
  return pick(questions);
}

function generateProduct(category, subcategory, existingIds, index) {
  const data = categoriesData[category];
  const brand = pick(brands[category]);
  const manufacturer = pick(manufacturers[category]);
  const series = pick(data.series);
  const material = pick(data.materials);
  const applications = data.applications[subcategory] || data.applications[Object.keys(data.applications)[0]];
  const certs = pickN(certifications[category], pick([2, 3, 4, 5]));
  const prefix = data.prefix;
  const subcategorySlug = subcategory.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-$/, '');

  // Generate sizes/variants based on subcategory
  const dimensions = pick([
    `${pick(['1/2', '3/4', '1', '1.5', '2', '3', '4', '6', '8', '10', '12'])} ${pick(['inch', 'mm', 'NPS', 'DN' + pick(['15', '20', '25', '40', '50', '80', '100', '150', '200', '250'])])}`,
    `${pick(['100', '150', '200', '250', '300', '400', '500', '600', '800', '1000', '1200'])} x ${pick(['50', '75', '100', '150', '200', '250', '300', '400', '500', '600'])} x ${pick(['25', '30', '40', '50', '60', '75', '80', '100', '120', '150'])} mm`,
    `${pick(['0.5', '1.0', '1.5', '2.0', '2.5', '3.0', '4.0', '5.0', '6.0', '8.0', '10.0', '12.0'])} ${pick(['m', 'ft', 'L', 'gal', 'kg', 'lb'])} capacity`
  ]);

  const weight = `${pick(['0.1', '0.2', '0.5', '0.8', '1.2', '1.8', '2.5', '3.5', '5.0', '7.5', '10', '15', '22', '30', '45', '60', '80', '100', '150'])} kg`;

  const features = [
    `Precision-engineered ${material.split(',')[0]} construction for durability`,
    `Designed for ${applications[0]} and ${applications[1]} applications`,
    `Compatible with standard ${category} system interfaces`,
    `Comprehensive documentation and certification package`,
    `Backed by ZENTRYO quality assurance and support`
  ];
  const benefits = [
    `Improved operational efficiency and system reliability`,
    `Reduced maintenance requirements and extended service intervals`,
    `Competitive pricing with OEM-compatible performance`
  ];

  const variantNum = String(index + 1).padStart(3, '0');
  const id = `${prefix}-${variantNum}`;
  const sku = `ZEN-${prefix.toUpperCase()}-${brand.slice(0, 3).toUpperCase()}-${String(10001 + index).slice(-5)}`;
  const mpn = `${series.split(' ')[0]}-${variantNum}-${pick(['A', 'B', 'C', 'R', 'S', 'T', 'X', 'Z'])}`;
  const name = `${brand} ${subcategory.replace(/s$/, '')} ${series} Model ${variantNum}`;
  const slug = generateSlug(name);

  const shortDesc = generateDescription(subcategory, name, series, material, features, applications, true);
  const longDesc = generateDescription(subcategory, name, series, material, features, applications, false);
  const techDesc = generateTechDescription(name, subcategory, material, applications);
  const technicalSpecs = generateRandomSpecs(subcategory, category, material);

  const faqQ = generateFAQ({ name, subcategory, certifications: certs });

  const tagsArr = [
    category.toLowerCase().replace(/ /g, '-'),
    subcategory.toLowerCase().replace(/ /g, '-'),
    brand.toLowerCase().replace(/ /g, '-'),
    series.toLowerCase().replace(/ /g, '-'),
    ...applications.slice(0, 2).map(a => a.toLowerCase().replace(/ /g, '-'))
  ];

  if (Math.random() < 0.1) tagsArr.push('featured');

  const uniqueTags = [...new Set(tagsArr)];

  const product = {
    id,
    slug,
    sku,
    mpn,
    name,
    brand,
    manufacturer,
    category,
    subcategory,
    industry: applications.slice(0, pick([2, 3, 4])),
    series,
    model: mpn,
    description: longDesc,
    shortDescription: shortDesc,
    technicalDescription: techDesc,
    applications: applications.slice(0, pick([3, 4, 5, 6])),
    features,
    benefits,
    technicalSpecifications: technicalSpecs,
    dimensions,
    weight,
    material,
    countryOfOrigin: pick(countryOfOrigin),
    certifications: certs,
    compatibleModels: existingIds.slice(-3).map(x => x.id),
    downloads: [
      { name: `${brand} ${series} Datasheet`, url: `https://example.com/${slug}-datasheet.pdf`, type: 'application/pdf', size: `${pick(['0.5', '1.0', '1.5', '2.0', '2.5', '3.5', '5.0'])} MB` }
    ],
    datasheets: [`https://example.com/${slug}-datasheet.pdf`],
    images: [
      { src: `https://images.pexels.com/photos/35568191/pexels-photo-35568191.jpeg?auto=compress&cs=tinysrgb&w=800`, alt: `${name} Front View`, width: 800, height: 800, isPrimary: true },
      { src: `https://images.pexels.com/photos/12527113/pexels-photo-12527113.jpeg?auto=compress&cs=tinysrgb&w=800`, alt: `${name} Detail View`, width: 800, height: 600, isPrimary: false }
    ],
    videos: [],
    documents: [
      { name: `${brand} Product Catalog`, url: `https://example.com/${brand.toLowerCase().replace(/ /g, '-')}-catalog.pdf`, type: 'application/pdf' }
    ],
    seoTitle: `${name} | ZENTRYO Industrial Supply`,
    seoDescription: shortDesc,
    seoKeywords: [brand, series, subcategory, category, ...applications.slice(0, 2)].map(s => s.toLowerCase()),
    canonical: `https://zentryo.com/products/${slug}`,
    ogImage: `https://images.pexels.com/photos/18471536/pexels-photo-18471536.jpeg?auto=compress&cs=tinysrgb&w=800`,
    faq: [
      faqQ
    ],
    relatedProducts: [],
    availability: pick(availabilities),
    tags: uniqueTags,
    createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString()
  };

  return product;
}

function generateCategoryData(category, count) {
  console.log(`Generating ${count} products for ${category}...`);
  const data = categoriesData[category];
  const products = [];
  const usedIds = new Set();

  for (let i = 0; i < count; i++) {
    const subcategory = pick(data.subcategories);
    let product = generateProduct(category, subcategory, products.slice(-10), i);

    // Ensure unique id
    while (usedIds.has(product.id)) {
      product.id = `${data.prefix}-${String(products.length + 1001).padStart(3, '0')}`;
    }
    usedIds.add(product.id);

    // Add related product references
    if (products.length >= 3) {
      const related = pickN(products, pick([2, 3, 4])).map(p => p.id);
      product.relatedProducts = related;
    }

    products.push(product);

    if ((i + 1) % 100 === 0) {
      console.log(`  ${category}: ${i + 1}/${count} products generated`);
    }
  }

  return products;
}

const TARGET_COUNT = 2000;
const categories = Object.keys(categoriesData);

let totalProducts = 0;

for (const category of categories) {
  const products = generateCategoryData(category, TARGET_COUNT);
  const filePath = path.join(PRODUCTS_DIR, `${category.toLowerCase().replace(/ /g, '-')}.json`);
  fs.writeFileSync(filePath, JSON.stringify(products, null, 2), 'utf-8');
  totalProducts += products.length;
  console.log(`✅ Written ${products.length} products to ${filePath}`);
}

console.log(`\n🎉 Total: ${totalProducts} products generated across ${categories.length} categories`);
