import asyncio, sys
from prisma import Prisma

async def main() -> None:
    prisma = Prisma()
    try:
        await prisma.connect()
        print("Prisma, Successfully Connected to Postgres!")

        # write the db query here
        addresses = await prisma.addresses.find_many()

        for address in addresses:
            print(address)
        print(f"Done logging: {len(addresses)} addresses")

    except:
        sys.exit(f"Something went wrong!")
    finally:
        await prisma.disconnect()
        print("Prisma has disconnected from postgres")

if __name__ == "__main__":
    asyncio.run(main())