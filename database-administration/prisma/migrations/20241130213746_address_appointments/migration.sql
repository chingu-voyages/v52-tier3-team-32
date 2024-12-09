-- CreateTable
CREATE TABLE "addresses" (
    "HSE_ID" BIGINT NOT NULL,
    "PIN" TEXT,
    "PIND" TEXT,
    "HSE_NBR" BIGINT,
    "HSE_FRAC_NBR" TEXT,
    "HSE_DIR_CD" TEXT,
    "STR_NM" TEXT,
    "STR_SFX_CD" TEXT,
    "STR_SFX_DIR_CD" TEXT,
    "UNIT_RANGE" TEXT,
    "ZIP_CD" BIGINT,
    "LAT" DOUBLE PRECISION,
    "LON" DOUBLE PRECISION,
    "X_COORD_NBR" DOUBLE PRECISION,
    "Y_COORD_NBR" DOUBLE PRECISION,
    "ASGN_STTS_IND" TEXT,
    "ENG_DIST" TEXT,
    "CNCL_DIST" TEXT,

    CONSTRAINT "addresses_pkey" PRIMARY KEY ("HSE_ID")
);

-- CreateTable
CREATE TABLE "appointments" (
    "NAME" TEXT,
    "EMAIL" TEXT NOT NULL,
    "PHONE_NUMBER" TEXT,
    "ADDRESS" TEXT,
    "PREFERRED_TIMESLOT" TEXT,
    "STATUS" TEXT,
    "DATE_TIMESTAMP" BIGINT,

    CONSTRAINT "appointments_pkey" PRIMARY KEY ("EMAIL")
);

-- CreateIndex
CREATE UNIQUE INDEX "appointments_EMAIL_key" ON "appointments"("EMAIL");

-- CreateIndex
CREATE UNIQUE INDEX "appointments_PHONE_NUMBER_key" ON "appointments"("PHONE_NUMBER");

-- CreateIndex
CREATE UNIQUE INDEX "appointments_ADDRESS_key" ON "appointments"("ADDRESS");
