using Microsoft.EntityFrameworkCore.Migrations;

namespace Exercise5.Data.Migrations
{
    public partial class noDuplicateForeignKey : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CategoryToComponentType_Categories_CategoryId1",
                table: "CategoryToComponentType");

            migrationBuilder.DropForeignKey(
                name: "FK_CategoryToComponentType_ComponentTypes_ComponentTypeId",
                table: "CategoryToComponentType");

            migrationBuilder.DropIndex(
                name: "IX_CategoryToComponentType_CategoryId1",
                table: "CategoryToComponentType");

            migrationBuilder.DropColumn(
                name: "CategoryId1",
                table: "CategoryToComponentType");

            migrationBuilder.AlterColumn<long>(
                name: "ComponentTypeId",
                table: "CategoryToComponentType",
                nullable: true,
                oldClrType: typeof(long));

            migrationBuilder.AlterColumn<int>(
                name: "CategoryId",
                table: "CategoryToComponentType",
                nullable: true,
                oldClrType: typeof(long));

            migrationBuilder.CreateIndex(
                name: "IX_CategoryToComponentType_CategoryId",
                table: "CategoryToComponentType",
                column: "CategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_CategoryToComponentType_Categories_CategoryId",
                table: "CategoryToComponentType",
                column: "CategoryId",
                principalTable: "Categories",
                principalColumn: "CategoryId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_CategoryToComponentType_ComponentTypes_ComponentTypeId",
                table: "CategoryToComponentType",
                column: "ComponentTypeId",
                principalTable: "ComponentTypes",
                principalColumn: "ComponentTypeId",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CategoryToComponentType_Categories_CategoryId",
                table: "CategoryToComponentType");

            migrationBuilder.DropForeignKey(
                name: "FK_CategoryToComponentType_ComponentTypes_ComponentTypeId",
                table: "CategoryToComponentType");

            migrationBuilder.DropIndex(
                name: "IX_CategoryToComponentType_CategoryId",
                table: "CategoryToComponentType");

            migrationBuilder.AlterColumn<long>(
                name: "ComponentTypeId",
                table: "CategoryToComponentType",
                nullable: false,
                oldClrType: typeof(long),
                oldNullable: true);

            migrationBuilder.AlterColumn<long>(
                name: "CategoryId",
                table: "CategoryToComponentType",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "CategoryId1",
                table: "CategoryToComponentType",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_CategoryToComponentType_CategoryId1",
                table: "CategoryToComponentType",
                column: "CategoryId1");

            migrationBuilder.AddForeignKey(
                name: "FK_CategoryToComponentType_Categories_CategoryId1",
                table: "CategoryToComponentType",
                column: "CategoryId1",
                principalTable: "Categories",
                principalColumn: "CategoryId",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_CategoryToComponentType_ComponentTypes_ComponentTypeId",
                table: "CategoryToComponentType",
                column: "ComponentTypeId",
                principalTable: "ComponentTypes",
                principalColumn: "ComponentTypeId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
