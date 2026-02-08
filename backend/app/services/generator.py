
from faker import Faker
import random
from datetime import datetime, timedelta
import uuid
from app.models.signal import WebSignal

fake = Faker('en_IN')

INDUSTRIES = [
    "Chemicals", "Textiles", "Pharmaceuticals", "Steel", "Power", "Construction", "Shipping", "Mining"
]

HP_PRODUCTS = ["Furnace Oil", "LDO", "HSD", "Bitumen", "Hexane", "Solvent 1425"]

SIGNAL_TEMPLATES = [
    "Tender Notice: Supply of industrial fuels required at {location} plant. Quantity: {quantity} KL.",
    "News: {company} announces expansion of its {industry} unit near {location}.",
    "Procurement Alert: Seeking vendors for boiler fuels and heavy machinery lubricants.",
    "Project Update: Commissioning of new captive power plant (CPP) at {location} facility.",
    "Tender: Annual contract for supply of {product} for our fleet operations.",
    "Market News: {company} to set up a new solvent extraction plant in {state}.",
    "Requirement: High grade Bitumen required for road project on NH-{highway_num}.",
    "Directory Listing: Leading manufacturer of {industry_product}. Contact for bulk orders."
]

class MockDataGenerator:
    def __init__(self):
        self.fake = fake

    def generate_signal(self) -> WebSignal:
        company = self.fake.company()
        location = self.fake.city()
        industry = random.choice(INDUSTRIES)
        
        # Map industry to likely products for better realism
        industry_product_map = {
            "Chemicals": "Chemicals",
            "Textiles": "Textiles",
            "Pharmaceuticals": "Chemicals",
            "Steel": "Industrial Fuels",
            "Power": "Industrial Fuels",
            "Construction": "Bitumen",
            "Shipping": "Marine Bunker Fuels",
            "Mining": "Industrial Fuels"
        }
        
        industry_product = industry_product_map.get(industry, "General Industrial Fuels")
        product = random.choice(HP_PRODUCTS) # Keep random product for variety, but we could refine this too
        
        args = {
            "company": company,
            "location": location,
            "industry": industry,
            "quantity": random.randint(50, 5000),
            "product": product,
            "state": self.fake.state(),
            "highway_num": random.randint(1, 100),
            "industry_product": industry_product
        }
        
        template = random.choice(SIGNAL_TEMPLATES)
        # Using a safe format approach or providing all args
        try:
             text = template.format(**args)
        except KeyError:
             # Fallback if a key is missing (though our args cover all keys used above)
             text = f"General News: {company} is reviewing procurement for {product}."
        
        source_type = "News"
        if "Tender" in text or "Procurement" in text:
            source_type = "Tender"
        elif "Directory" in text:
            source_type = "Directory"
            
        return WebSignal(
            signal_id=str(uuid.uuid4()),
            source=source_type,
            company_name=company,
            location=location,
            raw_text=text,
            url=self.fake.url(),
            timestamp=datetime.now() - timedelta(days=random.randint(0, 30))
        )

    def generate_batch(self, count: int = 10):
        return [self.generate_signal() for _ in range(count)]
