using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Exercise4.Migrations
{
    public partial class recreatedManyToManyRelationship : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.CreateTable(
                name: "CategoryToComponentType",
                columns: table => new
                {
                    CategoryId = table.Column<int>(nullable: false),
                    ComponentTypeId = table.Column<long>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CategoryToComponentType", x => new { x.CategoryId, x.ComponentTypeId });
                    table.ForeignKey(
                        name: "FK_CategoryToComponentType_Categories_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "Categories",
                        principalColumn: "CategoryId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CategoryToComponentType_ComponentTypes_ComponentTypeId",
                        column: x => x.ComponentTypeId,
                        principalTable: "ComponentTypes",
                        principalColumn: "ComponentTypeId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CategoryToComponentType_ComponentTypeId",
                table: "CategoryToComponentType",
                column: "ComponentTypeId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CategoryToComponentType");

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
    }
}
