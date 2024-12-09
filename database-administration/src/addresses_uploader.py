import csv
import sys
import asyncio
from prisma import Prisma

def check_string(value):
    # Check if the value is of type string
    if isinstance(value, str):
        return value
    return None

# Path to your CSV file
addresses_csv_file = "./resources/Addresses_in_the_City_of_Los_Angeles.csv"

async def read_csv(filename) -> None:
    # Open the CSV file
    with open(filename, newline='') as f:
        reader = csv.reader(f)
        count = 0
        columns = []
        prisma = Prisma()

        # Collecting records to be inserted
        records_to_insert = []

        try:
            await prisma.connect()  # Connect to the database

            # Read through the rows in the CSV
            for row in reader:
                if count == 0:  # First row: set up column headers
                    columns = row
                    print("Setting up columns")
                    print(columns)
                else:  # Second row: process the data
                    record = {
                        "HSE_ID": int(row[0]),
                        "PIN": check_string(row[1]),
                        "PIND": check_string(row[2]),
                        "HSE_NBR": int(row[3]),
                        "HSE_FRAC_NBR": check_string(row[4]),
                        "HSE_DIR_CD": check_string(row[5]),
                        "STR_NM": check_string(row[6]),
                        "STR_SFX_CD": check_string(row[7]),
                        "STR_SFX_DIR_CD": check_string(row[8]),
                        "UNIT_RANGE": check_string(row[9]),
                        "ZIP_CD": int(row[10]),
                        "LAT": float(row[11]),
                        "LON": float(row[12]),
                        "X_COORD_NBR": float(row[13]),
                        "Y_COORD_NBR": float(row[14]),
                        "ASGN_STTS_IND": check_string(row[15]),
                        "ENG_DIST": check_string(row[16]),
                        "CNCL_DIST": check_string(row[17]),
                    }
                    records_to_insert.append(record)

                count += 1

                # Insert in batches of 1000 rows to avoid memory issues and improve performance
                if len(records_to_insert) >= 1000:
                    await prisma.addresses.create_many(data=records_to_insert)
                    print(f"Inserted {len(records_to_insert)} rows.")
                    records_to_insert.clear()

            # Insert any remaining records that didn't fill up a batch
            if records_to_insert:
                await prisma.addresses.create_many(data=records_to_insert)
                print(f"Inserted {len(records_to_insert)} remaining rows.")

        except csv.Error as e:
            sys.exit(f'File {filename}, line {reader.line_num}: {e}')
        finally:
            await prisma.disconnect()  # Disconnect from the database


if __name__ == "__main__":
    asyncio.run(read_csv(addresses_csv_file))
