
# Full HPCL Direct Sales Portfolio
HPCL_PRODUCT_CATALOG = {
    "Industrial Fuels": [
        "Motor Spirit (MS)",
        "High Speed Diesel (HSD)",
        "Light Diesel Oil (LDO)",
        "Furnace Oil (FO)",
        "Low Sulphur Heavy Stock (LSHS)",
        "Superior Kerosene Oil (SKO)"
    ],
    "Specialty Products": [
        "Hexane",
        "Solvent 1425",
        "Mineral Turpentine Oil (MTO)",
        "Jute Batch Oil (JBO)"
    ],
    "Bitumen & Road": [
        "Bitumen VG-10",
        "Bitumen VG-30", 
        "Bitumen VG-40",
        "Bitumen Emulsion"
    ],
    "Marine & Bunker": [
        "Marine Fuel Oil (MFO)",
        "High Flash HSD (Naval)"
    ],
    "Petrochemicals & Others": [
        "Sulphur",
        "Propylene",
        "Toluene",
        "Benzene"
    ]
}

# Intelli-Map: Linking Keywords to Likely Product Needs
PRODUCT_SIGNAL_MAPPING = {
    # Industrial & Heating
    "boiler": ["Furnace Oil (FO)", "Light Diesel Oil (LDO)"],
    "furnace": ["Furnace Oil (FO)", "LSHS"],
    "heating": ["Furnace Oil (FO)", "LDO"],
    "insulation": ["Furnace Oil (FO)"],
    "power plant": ["Furnace Oil (FO)", "LSHS"],
    "captive power": ["Furnace Oil (FO)", "HSD"],

    # Transport & Machinery
    "generator": ["High Speed Diesel (HSD)"],
    "diesel": ["High Speed Diesel (HSD)"],
    "fleet": ["High Speed Diesel (HSD)"],
    "earth movers": ["High Speed Diesel (HSD)"],
    "mining": ["High Speed Diesel (HSD)", "LDO"],
    "bunker": ["Marine Fuel Oil (MFO)"],
    "shipping": ["Marine Fuel Oil (MFO)"],
    "port": ["Marine Fuel Oil (MFO)", "High Speed Diesel (HSD)"],

    # Road & Infrastructure
    "road project": ["Bitumen VG-30", "Bitumen VG-40"],
    "highway": ["Bitumen VG-30", "Bitumen VG-40"],
    "pavement": ["Bitumen Emulsion"],
    "civil works": ["Bitumen VG-10"],

    # Specialty Applications
    "paint": ["Mineral Turpentine Oil (MTO)", "Solvent 1425"],
    "coating": ["Mineral Turpentine Oil (MTO)"],
    "extraction": ["Hexane"],
    "solvent": ["Hexane", "Solvent 1425"],
    "vegetable oil": ["Hexane"],
    "pharma": ["Specialty Solvents"],
    "rubber": ["Mineral Turpentine Oil (MTO)"],
    "jute": ["Jute Batch Oil (JBO)"],
    "textile": ["Jute Batch Oil (JBO)", "Specialty Solvents"],

    # Petrochemicals
    "fertilizer": ["Sulphur", "Naphtha"],
    "agrochemical": ["Solvent 1425", "Sulphur"],
    "chemical plant": ["Propylene", "Benzene", "Toluene"],
    "polymer": ["Propylene"]
}
