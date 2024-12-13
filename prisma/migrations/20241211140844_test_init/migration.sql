-- CreateTable
CREATE TABLE "users" (
    "instance_id" TEXT,
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "aud" TEXT,
    "role" TEXT,
    "email" TEXT,
    "encrypted_password" TEXT,
    "email_confirmed_at" TIMESTAMP(3),
    "invited_at" TIMESTAMP(3),
    "confirmation_token" TEXT,
    "confirmation_sent_at" TIMESTAMP(3),
    "recovery_token" TEXT,
    "recovery_sent_at" TIMESTAMP(3),
    "email_change_token_new" TEXT,
    "email_change" TEXT,
    "email_change_sent_at" TIMESTAMP(3),
    "last_sign_in_at" TIMESTAMP(3),
    "raw_app_meta_data" JSONB,
    "raw_user_meta_data" JSONB,
    "is_super_admin" BOOLEAN,
    "created_at" TIMESTAMP(3),
    "updated_at" TIMESTAMP(3),
    "phone" TEXT,
    "phone_confirmed_at" TIMESTAMP(3),
    "phone_change" TEXT,
    "phone_change_token" TEXT,
    "phone_change_sent_at" TIMESTAMP(3),
    "confirmed_at" TIMESTAMP(3),
    "email_change_token_current" TEXT,
    "email_change_confirm_status" INTEGER,
    "banned_until" TIMESTAMP(3),
    "reauthentication_token" TEXT,
    "reauthentication_sent_at" TIMESTAMP(3),
    "is_sso_user" BOOLEAN NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "is_anonymous" BOOLEAN NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profiles" (
    "id" UUID NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "todos" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "due_date" TIMESTAMP(6) NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "profile_id" UUID,

    CONSTRAINT "todos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "users_instance_id_idx" ON "users"("instance_id");

-- CreateIndex
CREATE INDEX "users_is_anonymous_idx" ON "users"("is_anonymous");

-- CreateIndex
CREATE UNIQUE INDEX "profiles_email_key" ON "profiles"("email");

-- AddForeignKey
ALTER TABLE "profiles" ADD CONSTRAINT "profiles_id_fkey" FOREIGN KEY ("id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "todos" ADD CONSTRAINT "todos_profile_id_fkey" FOREIGN KEY ("profile_id") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
