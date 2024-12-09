import asyncio
import sys
import csv
from prisma import Prisma
from sys import exception
from tqdm import tqdm

def infer_type(value, column_name=None):
    value = value.strip()  # Remove leading/trailing whitespaces

    # If the value is empty after stripping, return None (for NULL in the database)
    if len(value) == 0:
        return None

    # Check for numeric values (integer or float)
    if value.isdigit():  # Check if the value contains only digits (for integers)
        return int(value)

    try:
        # Try to parse as a float (this handles decimal numbers)
        return float(value)
    except ValueError:
        pass

    # If the value contains alphabetic characters, treat it as a string
    if any(char.isalpha() for char in value):
        return str(value)

    # Check if the value starts with a special character (e.g., "(" or other non-alphanumeric symbols)
    if not value[0].isalnum():  # If the first character is not alphanumeric, assume it's a string
        return str(value)

    # Default to string type for any other values
    return str(value)


async def upload_batch(prisma, columns, batch):
    """Uploads a batch of rows to the database."""
    payload = [
        {columns[i]: infer_type(item, columns[i]) for i, item in enumerate(row)}
        for row in batch
    ]

    print(payload)
    await prisma.appointments.create_many(data=payload)


async def main() -> None:
    filename = "./resources/Solar_Panel_Evaluation_Requests.csv"
    batch_size = 1000  # Define the number of rows per batch
    prisma = Prisma()

    try:
        await prisma.connect()

        with open(filename, newline='') as f:  # open the csv file
            reader = csv.reader(f)
            rows = list(reader)  # Convert reader to list for easier manipulation
            columns = rows[0]  # First row is the header
            data_rows = rows[1:]  # Remaining rows are the data
            total_rows = len(data_rows)

            print(f"Uploading {total_rows} rows to the database in batches of {batch_size}...")

            # Process rows in batches
            for start in tqdm(range(0, total_rows, batch_size), desc="Uploading batches", unit="batch"):
                batch = data_rows[start:start + batch_size]
                await upload_batch(prisma, columns, batch)

        print("All rows uploaded successfully!")

    except csv.Error as e:
        sys.exit(f"File {filename}, line {reader.line_num}: {e}")

    finally:
        await prisma.disconnect()


if __name__ == "__main__":
    asyncio.run(main())
