@startuml
App o-- ResourceResolver
App o-- EntityEmitter
App o-- InputHolder
App o-- Seane

Seane <|-- TitleSeane
Seane <|-- GameSeane

GameSeane o-- Map
GameSeane o-- Player
GameSeane o-- Alian
GameSeane o-- Holl

GameSeane o-- SubSeane

SubSeane <|-- StartSubSeane
SubSeane <|-- PlayingSubSeane
SubSeane <|-- CompleteSubSeane
SubSeane <|-- MissedSubSeane
SubSeane <|-- GameOverSubSeane


interface Seane {
}

interface SubSeane {
}
@enduml