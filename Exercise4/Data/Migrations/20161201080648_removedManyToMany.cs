using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Metadata;

namespace Exercise4.Migrations
{
    public partial class removedManyToMany : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CategoryToComponentType");

            migrationBuilder.AlterColumn<string>(
                name: "ComponentName",
                table: "ComponentTypes",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AddColumn<long>(
                name: "ComponentTypeId",
                table: "Categories",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Categories_ComponentTypeId",
                table: "Categories",
                column: "ComponentTypeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Categories_ComponentTypes_ComponentTypeId",
                table: "Categories",
                column: "ComponentTypeId",
                principalTable: "ComponentTypes",
                principalColumn: "ComponentTypeId",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Categories_ComponentTypes_ComponentTypeId",
                table: "Categories");

            migrationBuilder.DropIndex(
                name: "IX_Categories_ComponentTypeId",
                table: "Categories");

            migrationBuilder.DropColumn(
                name: "ComponentTypeId",
                table: "Categories");

            migrationBuilder.AlterColumn<string>(
                name: "ComponentName",
                table: "ComponentTypes",
                nullable: true,
                oldClrType: typeof(string));

            migrationBuilder.CreateTable(
                name: "CategoryToComponentType",
                columns: table => new
                {
                    CategoryToComponentTypeId = table.Column<long>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CategoryId = table.Column<int>(nullable: true),
                    ComponentTypeId = table.Column<long>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CategoryToComponentType", x => x.CategoryToComponentTypeId);
                    table.ForeignKey(
                        name: "FK_CategoryToComponentType_Categories_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "Categories",
                        principalColumn: "CategoryId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_CategoryToComponentType_ComponentTypes_ComponentTypeId",
                        column: x => x.ComponentTypeId,
                        principalTable: "ComponentTypes",
                        principalColumn: "ComponentTypeId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CategoryToComponentType_CategoryId",
                table: "CategoryToComponentType",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_CategoryToComponentType_ComponentTypeId",
                table: "CategoryToComponentType",
                column: "ComponentTypeId");
        }
    }
}
